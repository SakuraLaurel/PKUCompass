// pages/myZone/starTrack/starTrack.js
var app = getApp()
var mz
var oriTracks
var toOri
var tracks
var index
var by2pos
var byDay
var sureValue

Page({
  data:{
    meta: null,
    input: null,
    photos: null,
    polylines: null,
    star: null,
    share: null,
    single: null,
    pickerValue: null,
    showList: null
  },
  onLoad: function(){
    this.initial()
    this.mapCtx = wx.createMapContext('mainMap')
    app.getMyZone((res)=>{
      mz = res
      this.transform()
    })
  },
  initial:function(){
    oriTracks = []
    toOri = []
    tracks = []
    index = 0
    by2pos= []
    byDay = {day: [],value: []}
    sureValue = [0,0]
    this.setData({
      meta: '',
      input: '',
      photos: [],
      polylines: [{points:[]}],
      star: false,
      share: false,
      single: true,
      pickerValue: [0,0],
      showList: []
    })
  },
  transform: function(){
    mz.get().then(res=>{
      oriTracks = res.data.tracks
      for(var i = 0;i != oriTracks.length;++i){
        if(oriTracks[i].star){
          tracks.push(oriTracks[i])
          toOri.push(i)
        }
      }
      if(tracks.length != 0){
        var day = ''
        for(var i = 0;i != tracks.length;++i){
          var t = tracks[i]
          var newDay = t.startTime.getFullYear().toString()+'/'+(t.startTime.getMonth()+1).toString()+'/'+t.startTime.getDate().toString()
          var input = '('+i.toString()+') '+t.value
          if(newDay != day){
            day = newDay
            byDay.day.unshift(day)
            byDay.value.unshift([input])
            by2pos.unshift([i])
          }else{
            byDay.value[0].unshift(input)
            by2pos[0].unshift(i)
          }
        }
        this.data.showList.push(byDay.day)
        this.data.showList.push(byDay.value[0])
        this.show()
        this.setData(this.data)
      }else{
        app.navigateBack('暂无记录')
      }
    }).catch(res=>{
      app.navigateBack('未能获取记录')
    })
  },
  show: function(){
    index = by2pos[sureValue[0]][sureValue[1]]
    var track = tracks[index]
    var meta = '起始时间：'+app.formatTime(track.startTime)
    if(track.star){
      meta += '⭐'
    }
    if(track.share){
      meta += '💌'
    }
    meta += '\n终止时间：'+app.formatTime(track.endTime)
    if(track.polyline.points.length == 0){
      meta += '\n(无轨迹数据)'
    }else{
      this.mapCtx.moveToLocation({
        latitude: track.polyline.points[0].latitude,
        longitude: track.polyline.points[0].longitude
      })
    }
    this.setData({
      meta: meta,
      input: track.value,
      polylines: [track.polyline],
      single: true,
      photos: track.photos,
      star: track.star,
      share: track.share
    })
  },
  cancel:function(){
    wx.navigateBack()
  },
  pickerSure:function(e){
    sureValue = [e.detail.value[0],e.detail.value[1]]
    this.show()
  },
  pickerChange:function(e){
    this.data.pickerValue[e.detail.column] = e.detail.value
    this.data.showList[1] = byDay.value[this.data.pickerValue[0]]
    this.setData(this.data)
  },
  delete: function(){
    var self = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除本记录',
      success (res) {
        if (res.confirm) {
          var photos = tracks[index].photos
          for(var i = toOri[index] + 1;i != oriTracks.length;++i){
            oriTracks[i - 1] = oriTracks[i]
          }
          oriTracks.pop()
          mz.update({
            data:{
              tracks: oriTracks
            }
          }).then(res=>{
            if(res.stats.updated != 0){
              wx.cloud.deleteFile({
                fileList: photos
              }).then(res=>{
                  wx.showToast({
                    title: '删除成功',
                    duration: 1000
                  })
                  self.initial()
                  self.transform()
                })
              }
            }
          )
        }
      }
    })
  },
  statusChange: function(key,status){
    wx.showLoading({
      title: '修改中……',
    })
    tracks[index][key] = status
    oriTracks[toOri[index]][key] = status
    mz.update({
      data:{
        tracks:oriTracks
        }
    }).then((res)=>{
      wx.hideLoading()
      if(res.stats.updated != 0){
        wx.showToast({
          title: '更新成功',
          duration: 800
        })
        var meta = '起始时间：'+app.formatTime(tracks[index].startTime)
        this.setData({
          [key]: status
        })
        if(this.data.star){
          meta += '⭐'
        }
        if(this.data.share){
          meta += '💌'
        }
        meta +='\n终止时间：'+app.formatTime(tracks[index].endTime)
        if(tracks[index].polyline.points.length == 0){
          meta += '\n(无轨迹数据)'
        }
        this.setData({
          meta: meta
        })
      }else{
        wx.showLoading({
          title: '更新失败',
        })
        setTimeout(wx.hideLoading,1000)
      }
    })
  },
  setStar:function(){
    this.statusChange('star',true)
  },
  cancelStar:function(){
    this.statusChange('star',false)
  },
  setShare:function(){
    this.statusChange('share',true)
  },
  cancelShare:function(){
    this.statusChange('share',false)
  },
  IWantAll:function(){
    var res = []
    for(var i = 0;i != tracks.length;++i){
      if(tracks[i].polyline.points.length != 0){
        res.push(tracks[i].polyline)
      }
    }
    this.setData({
      single: false,
      polylines: res
    })
  },
  IChoose:function(){
    this.setData({
      single: true,
      polylines: [tracks[index].polyline]
    })
  }
})