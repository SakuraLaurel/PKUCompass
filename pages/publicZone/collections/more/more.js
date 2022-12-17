// pages/publicZone/collections/more/more.js'
var app = getApp()
var mz
var log

Page({
  data:{
    marker:[],
    polyline: [],
    photos:[],
    collected: true,
    meta:'',
    value: '',
    order: 0
  },
  onLoad:function(options){
    this.mapCtx = wx.createMapContext('mainMap')
    app.getMyZone(res=>{
      mz = res
    })
    log = JSON.parse(decodeURIComponent(options.log))
    var lat,lon,iconPath
    this.setData({
      meta: log.meta,
      value: log.value,
      photos: log.photos,
      order: parseInt(options.order)
    })
    if(log.type === 'position'){
      this.mapCtx.moveToLocation({
        latitude: log.latitude,
        longitude: log.longitude
      })
      lat = log.latitude
      lon = log.longitude
      iconPath = app.globalData.greenPath
    }else{
      this.setData({
        polyline: [log.polyline]
      })
      lat = 0
      lon = 0
      iconPath = app.globalData.redPath
      if(log.polyline.points.length != 0){
        this.mapCtx.moveToLocation({
          latitude: log.polyline.points[0].latitude,
          longitude: log.polyline.points[0].longitude
        })
        lat = log.polyline.points[0].latitude,
        lon = log.polyline.points[0].longitude
      }
    }
    this.setData({
      marker:[{
        iconPath: iconPath,
        id: options.order,
        latitude: lat,
        longitude: lon,
        width: 30,
        height: 30,
        label:{
          content: options.order.toString(),
          color: "#FF0000",
          fontSize: 20,
          anchorX: -5,
          anchorY: -55
        }
      }]
    })
  },
  set:function(){
    mz.get().then(res=>{
      var collections = res.data.collections
      collections.push(log)
      mz.update({
        data:{
          collections: collections
        }
      }).then(res=>{
        if(res.stats.updated != 0){
          this.setData({
            collected: true,
            order: collections.length - 1
          })
        }
      })
    })
  },
  cancel:function(){
    mz.get().then(res=>{
      var collections = res.data.collections
      for(var i = this.data.order + 1;i != collections.length;++i){
        collections[i-1] = collections[i]
      }
      collections.pop()
      mz.update({
        data:{
          collections: collections
        }
      }).then(res=>{
        if(res.stats.updated != 0){
          this.setData({
            collected: false
          })
        }
      })
    })
  }
})