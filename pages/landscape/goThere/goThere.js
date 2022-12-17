// pages/landscape/goThere/goThere.js
var app = getApp()
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js')  //腾讯地图api
var qqmapsdk

Page({
  data: {
    latitude: 0,
    longitude: 0,
    guide: false,
    polyline: [],
    marker: [],
    name: '',
    content: '',
    hasPhoto: true,
    photo: ''
  },
  onLoad:function(options){
    this.mapCtx = wx.createMapContext('mainMap')
    qqmapsdk = new QQMapWX({  //获取api使用权
      key: app.globalData.apiKey
    })
    var num = parseInt(options.num)
    if(num === 26 || num === 54 || num === 74){
      this.data.hasPhoto = false
    }else{
      this.data.photo = app.globalData.address + 'landscape/'+(num+1).toString()
      var format = num === 24? '.jpeg' : '.jpg'
      this.data.photo += format
    }
    var log = app.globalData.landscape[num]
    this.setData({
      latitude: log.latitude,
      longitude: log.longitude,
      name: log.name,
      content: log.content,
      hasPhoto: this.data.hasPhoto,
      photo: this.data.photo
    })
    if(log.latitude > 10){
      this.setData({
        marker: [{
          iconPath: app.globalData.redPath,
          latitude: log.latitude,
          longitude: log.longitude,
          width: 30,
          height: 30
        }]
      })
      this.mapCtx.moveToLocation({
        latitude: log.latitude,
        longitude: log.longitude
      })
    }else{
      this.mapCtx.moveToLocation()
    }
  },
  go:function(){
    if(this.data.latitude > 10){
      var self = this
    this.mapCtx.moveToLocation()
    qqmapsdk.direction({
      mode: 'walking',
      // from: e.detail.value.start,
      to: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      success: function (res) {
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        self.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }],
          guide: true
        })
      },
      fail: error=> {
        wx.showLoading({
          title: '导航失败',
        })
        setTimeout(wx.hideLoading,1000)
        this.mapCtx.moveToLocation({
          latitude: this.data.latitude,
          longitude: this.data.longitude
        })
      }
    })
    }else{
      wx.showLoading({
        title: '当前点无坐标',
      })
      setTimeout(wx.hideLoading,1000)
    }
  },
  cancel:function(){
    this.setData({
      polyline:[],
      guide: false
    })
    this.mapCtx.moveToLocation({
      latitude:this.data.latitude,
      longitude: this.data.longitude
    })
  }
})