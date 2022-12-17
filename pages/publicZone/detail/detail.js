// pages/publicZone/detail/detail.js
var app = getApp()
var mz

Page({
  data: {
    photos:[],
    polyline:[],
    marker:[],
    meta: '',
    input: '',
    log: null,
    collected: false
  },
  onLoad:function(options){
    wx.showLoading({
      title: '加载中'
    })
    app.getMyZone((res)=>{
      mz = res
    })
    this.mapCtx = wx.createMapContext('mainMap')
    this.data.log = JSON.parse(decodeURIComponent(options.log))
    var lat = 0
    var lon = 0
    var iconPath = app.globalData.greenPath
    if(this.data.log.type === 'position'){
      lat = this.data.log.latitude,
      lon = this.data.log.longitude
      this.setData({
        meta: '时间：'+this.data.log.time+'\n位置：'+this.data.log.latitude.toString()+'°N, '+this.data.log.longitude.toString()+'°E',
        input: this.data.log.value,
        photos: this.data.log.photos
      })
      this.mapCtx.moveToLocation({
        latitude: lat,
        longitude: lon
      })
    }else{
      iconPath = app.globalData.redPath
      this.setData({
        polyline: [this.data.log.polyline],
        meta: '起始时间：'+this.data.log.time+'\n终止时间：'+this.data.log.endTime,
        input: this.data.log.value,
        photos: this.data.log.photos
      })
      if(this.data.log.polyline.points.length != 0){
        lat = this.data.log.polyline.points[0].latitude,
        lon = this.data.log.polyline.points[0].longitude
        this.mapCtx.moveToLocation({
          latitude: lat,
          longitude: lon
        })
      }
    }
    this.setData({
      marker:[{
        iconPath: iconPath,
        latitude: lat,
        longitude: lon,
        width: 30,
        height: 30,
        label:{
          content: options.order,
          color: "#FF0000",
          fontSize: 20,
          anchorX: -5,
          anchorY: -55
        }
      }]
    })
    wx.hideLoading()
  },
  set:function(){
    wx.showLoading({
      title: '收藏中',
    })
    mz.get().then(res=>{ 
      var collections = res.data.collections
      var newOne = {
        latitude: this.data.log.latitude,
        longitude: this.data.log.longitude,
        meta: this.data.meta,
        value: this.data.input,
        photos: this.data.photos
      }
      if(this.data.log.type === 'position'){
        newOne.type = 'position'
      }else{
        newOne.type = 'track'
        newOne.polyline = this.data.polyline[0]
      }
      collections.push(newOne)
      mz.update({
        data:{
          collections: collections
        }
      }).then((res)=>{
        wx.hideLoading()
        if(res.stats.updated != 0){
          wx.showToast({
            title: '收藏成功',
            duration: 1000
          })
        }
        this.setData({
          collected: true
        })
      })
    })
  },
  cancel: function(){
    mz.get().then(res=>{
      var collections = res.data.collections
      collections.pop()
      mz.update({
        data:{
          collections: collections
        }
      }).then(res=>{
        if(res.stats.updated != 0){
          wx.showToast({
            title: '已取消',
            duration: 1000
          })
          this.setData({
            collected: false
          })
        }
      })
    })
  }
})