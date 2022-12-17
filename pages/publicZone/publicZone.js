// pages/publicZone/publicZone.js
var app = getApp()
var mz
var logs
var firstShow

Page({
  data:{
    polylines: [{points:[]}],
    markers: [],
    logs:[],
  },
  onLoad: function(){
    firstShow = false
    this.mapCtx = wx.createMapContext('mainMap')
    app.applyForLocation()
    app.getMyZone((res)=>{
      mz = res
      this.download().then(()=>{
        firstShow = true
        this.mapCtx.moveToLocation()
      })
    })
  },
  onShow: function(){
    if(firstShow){
      this.download()
      setTimeout(this.mapCtx.moveToLocation,1000)
    }
  },
  download: function(){
    return new Promise(function(resolve){
      wx.showLoading({
        title: '下载数据中',
      })
      logs = []
      wx.cloud.database().collection('zone').get().then(res=>{
        for(var user in res.data){
          for(var position in res.data[user].positions){
            var log = res.data[user].positions[position]  //虽然这里position是字符串数字，但不知道为什么可以索引
            if(log.share){
              logs.push({
                type: 'position',
                latitude: log.latitude,
                longitude: log.longitude,
                time: log.time,
                photos: log.photos,
                value: log.value
              })
            }
          }
          for(var track in res.data[user].tracks){
            var log = res.data[user].tracks[track]
            if(log.share){
              var lat = 0,lon = 0
              if(log.polyline.points.length != 0){
                lat = log.polyline.points[0].latitude
                lon = log.polyline.points[0].longitude
              }
              logs.push({
                type: 'track',
                latitude: lat,
                longitude: lon,
                time: log.startTime,
                endTime: log.endTime,
                photos: log.photos,
                value: log.value,
                polyline: log.polyline
              })
            }
          }
        }
        logs.sort((a,b)=>{
          return b.time - a.time
        })
        wx.hideLoading()
        resolve()
      }).catch(res=>{
        wx.hideLoading()
        app.navigateBack('数据获取失败')
      })
    })
  },
  move:function(){
    var SW,NE
    if(logs.length != 0){
      this.mapCtx.getRegion({
        success:res=>{
          this.data.logs = []
          this.data.polylines = []
          this.data.markers = []
          SW = res.southwest
          NE = res.northeast
          var count = 0
          for(var i = 0;i != logs.length;++i){
            if(count > 100){
              break
            }
            var log = {}
            Object.assign(log,logs[i])
            log.time = app.formatTime(logs[i].time)  //好像url传递json里时间会出什么问题
            if(logs[i].type === 'track'){
              log.endTime = app.formatTime(logs[i].endTime)
            }
            if(log.latitude > SW.latitude && log.latitude < NE.latitude && log.longitude > SW.longitude && log.longitude < NE.longitude){
              var type = log.type === 'position' ? '(位置) ' : '(轨迹) '
              this.data.logs.push({
                meta:'('+count.toString()+') '+log.time+' 📷'+log.photos.length.toString(),
                value:type + log.value,
                order: i,
                para: encodeURIComponent(JSON.stringify(log))
              })
              count += 1
            }
          }
          for(var i = 0;i != this.data.logs.length;++i){
            var marker = {
              iconPath: app.globalData.greenPath,
              id: i,
              latitude: logs[this.data.logs[i].order].latitude,
              longitude: logs[this.data.logs[i].order].longitude,
              width: 30,
              height: 30,
              label:{
                content: i.toString(),
                color: "#FF0000",
                fontSize: 20,
                anchorX: -5,
                anchorY: -55
              }
            }
            if(logs[i].type === 'track'){
              this.data.polylines.push(logs[i].polyline)
              marker.iconPath = app.globalData.redPath
            }
            this.data.markers.push(marker)
          }
          this.setData(this.data)
        }
      })
    }else{
      app.navigateBack('暂无分享记录')
    }
  },
  moveToPKU:function(){
    this.mapCtx.moveToLocation({
      latitude:app.globalData.latitude,
      longitude:app.globalData.longitude
    })
  }
})