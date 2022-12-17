// pages/publicZone/collections/collections.js
var app = getApp()
var mz
var firstShow
Page({
  data: {
    markers:[],
    polylines:[],
    logs:[]
  },
  onLoad: function(){
    firstShow = false
    this.mapCtx = wx.createMapContext('mainMap')
    app.getMyZone((res)=>{
      mz = res
      this.download(()=>{
        firstShow = true
      })
    })
  },
  onShow:function(){
    if(firstShow){
      this.download(()=>{})
    }
  },
  download: function(callback){
    this.setData({
      markers: [],
      polylines: [],
      logs: []
    })
    mz.get().then(res=>{
      if(res.data.collections.length === 0){
        app.navigateBack('暂无收藏')
      }
      for(var i = 0;i != res.data.collections.length;++i){
        var log = res.data.collections[i]
        this.data.logs.unshift({
          meta: log.meta,
          value: log.value,
          order: i,
          para: encodeURIComponent(JSON.stringify(log))
        })
        var marker = {
          iconPath: app.globalData.greenPath,
          id: i,
          latitude: log.latitude,
          longitude: log.longitude,
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
        if(log.type === 'track'){
          this.data.polylines.push(log.polyline)
          marker.iconPath = app.globalData.redPath
        }
        this.data.markers.push(marker)
      }
      this.setData(this.data)
      this.mapCtx.moveToLocation({
        latitude: this.data.markers[0].latitude,
        longitude: this.data.markers[0].longitude
      })
      callback()
    })
  }
})