// pages/myZone/logTrack/logTrack.js
var app = getApp()
var mz
var canIGetLocation

Page({
  data:{
    polyline: [{
      points:[],
      color: '#FF0000DD',
      width: 4
    }],
    startTime: 0,
    endTime: 0,
    meta: '',
    input: '',
    photos:[],
    logging: false,
    photoStatus: '上传照片',
    keyboardHeight: 0
  },
  onLoad: function(){
    this.mapCtx = wx.createMapContext('mainMap')
    app.getMyZone((res)=>{
      mz = res
      this.start()
      setTimeout(this.mapCtx.moveToLocation,1000)
    })
  },
  moveToMe: function(){
    this.mapCtx.moveToLocation()
  },
  upRoll: function(e){
    this.setData({
      keyboardHeight: e.detail.height
    })
    wx.pageScrollTo({
      scrollTop: this.data.keyboardHeight,
      duration: 200
    })
  },
  downRoll:function(){
    wx.pageScrollTo({
      scrollTop: -this.data.keyboardHeight,
      duration: 200
    })
    this.setData({
      keyboardHeight: 0
    })
  },  clear:function(){
    this.setData({
      input: ''
    })
  },
  load: function(){
    wx.chooseImage({
      success:res=>{
        this.setData({
          photos:res.tempFilePaths,
          photoStatus: '重新选择'
        })
      },fail:()=>{
        this.setData({
          photos: [],
          loaded: '上传照片'
        })
      }
    })
  },
  photoPathsTranslate: function(start){
    const ag = app.globalData
    var res = []
    var photos = this.data.photos
    for(var i = 0;i != photos.length;++i){
      var format = photos[i].split('.')
      res.push(ag.openid+'/'+(i+start).toString()+'.'+format[format.length-1])
    }
    return res
  },
  synchronize:function(e){
    this.setData({
      input: e.detail.value 
    })
  },
  start: function(){
    wx.getSetting({
      success:res=>{
        if(res.authSetting['scope.userLocation']){
          if(res.authSetting['scope.userLocationBackground']){
            wx.startLocationUpdateBackground()
          }else{
            wx.startLocationUpdate()
          }
          wx.getLocation({
            success:()=>{
              wx.showToast({
                title: '开始记录',
                duration: 800
              })
              canIGetLocation = true
            },fail:()=>{
              wx.showLoading({
                title: '定位失败',
              })
              setTimeout(wx.hideLoading,800)
              canIGetLocation = false
            }
          })
          var time = new Date()
          this.setData({
            logging: true,
            startTime: time,
            meta: '起始时间：' + app.formatTime(time)
          })
          if(canIGetLocation){
            wx.onLocationChange(res=>{
              this.data.polyline[0].points.push({
                latitude: res.latitude.toFixed(5),
                longitude: res.longitude.toFixed(5)
              })
              this.setData(this.data)
            })
          }
        }else{
          wx.navigateBack({
            complete: (res) => {
              wx.showLoading({
                title: '未授权位置信息',
              })
              setTimeout(wx.hideLoading,1000)
            },
          })
        }
      },fail:()=>{
        wx.navigateBack({
          complete: (res) => {
            wx.showLoading({
              title: '无法获取授权信息',
            })
            setTimeout(wx.hideLoading,1000)
          },
        })
      }
    })
  },
  stop:function(){
    if(canIGetLocation){
      wx.offLocationChange()
      wx.stopLocationUpdate()
    }
    var time = new Date()
    this.setData({
      endTime: time,
      logging: false,
      meta: '起始时间：' + app.formatTime(this.data.startTime) + '\n终止时间：'+app.formatTime(time)
    })
  },
  cancel:function(){
    wx.navigateBack()
  },
  publish:function(){
    if(this.data.logging){
      wx.showLoading({
        title: '请先停止记录',
      })
      setTimeout(wx.hideLoading,500)
    }else{
      var self = this
      wx.showLoading({
        title: '正在发布',
      })
      mz.get().then(res=>{
        var photos = this.photoPathsTranslate(res.data.numOfPhotos)
        function loading(num){
          if(num === photos.length){
            for(var i = 0;i != photos.length;++i){
              photos[i] = app.globalData.address + photos[i]
            }
            var tracks = res.data.tracks
            tracks.push({
              startTime: self.data.startTime,
              endTime: self.data.endTime,
              polyline: self.data.polyline[0],
              value:self.data.input,
              photos:photos,
              star: false,
              share: false
            })
            mz.update({
              data:{
                numOfPhotos: num + res.data.numOfPhotos,
                tracks: tracks
              }
            }).then(res=>{
              wx.hideLoading()
              if(res.stats.updated != 0){
                wx.navigateBack({
                  complete: (res) => {
                    wx.showToast({
                      title:'发布成功',
                      duration:500
                    })
                  },
                })
              }else{
                wx.showLoading({
                title: '发布失败'
                })
                setTimeout(wx.hideLoading,1000)
              }
            })
          }else{
            wx.cloud.uploadFile({
              cloudPath:photos[num],
              filePath:self.data.photos[num],
              success:()=>{
                loading(num + 1)
              },fail:(res)=>{
                wx.hideLoading()
                wx.showLoading({
                  title: '发布失败'
                  })
                setTimeout(wx.hideLoading,1000)
              }
            })
          }
        }loading(0)
      })
    }
  }
})