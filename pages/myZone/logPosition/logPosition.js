// pages/myZone/logPosition/logPosition.js
var app = getApp()
var mz

Page({
  data:{
    latitude: app.globalData.latitude,
    longitude: app.globalData.longitude,
    time: 0,
    meta: '',
    input: '',
    photos:[],
    photoStatus: '上传照片',
    keyboardHeight: 0
  },
  onLoad: function(){
    this.mapCtx = wx.createMapContext('mainMap')
    this.log()
    app.getMyZone((res)=>{
      mz = res
      setTimeout(this.mapCtx.moveToLocation,1000)
    })
  },
  moveToMe: function(){
    this.mapCtx.moveToLocation()
  },
  getLocation:function(){
    return new Promise(resolve=>{
      wx.getLocation({
        type: 'gcj02',
        isHighAccuracy: true,
        success:res=>{
          this.setData({
            latitude : res.latitude.toFixed(5),
            longitude: res.longitude.toFixed(5)
          })
          resolve()
        },fail:()=>{
          wx.showLoading({
            title: '定位失败'
          })
          setTimeout(wx.hideLoading,1000)
          this.setData({
            latitude: 0,
            longitude: 0
          })
          resolve()
        }
      })
    })
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
  },
  log: function(){
    this.getLocation().then(()=>{
      var time = new Date()
      this.setData({
        time: time,
        meta: app.formatTime(time) + '\n位置：'+this.data.latitude.toString()+'°N, '+this.data.longitude.toString()+'°E'
      })
    })
  },
  clear:function(){
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
  cancel:function(){
    wx.navigateBack()
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
  publish: function(){
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
          var positions = res.data.positions
          positions.push({
            time: self.data.time,
            latitude:self.data.latitude,
            longitude:self.data.longitude,
            value:self.data.input,
            photos:photos,
            star: false,
            share: false
          })
          mz.update({
            data:{
              numOfPhotos: num + res.data.numOfPhotos,
              positions: positions
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
})