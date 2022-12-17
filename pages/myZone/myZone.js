// pages/myZone/myZone.js
var app = getApp()

Page({
  data:{
    showLocation: false  //为了不让地图移到当前定位点，需要动态设置show-location
  },
  onLoad: function(){
    this.mapCtx = wx.createMapContext('mainMap')
    app.applyForLocation()  //进行位置授权申请
    this.mapCtx.moveToLocation({  //移动到默认点（北大）
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      complete:()=>{
        this.setData({
          showLocation: true  //显示“我的位置”
        })
      }
    })
  },
  moveToMe: function(){  //定位到我
    this.mapCtx.moveToLocation()
  }
})