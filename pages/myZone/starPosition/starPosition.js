// pages/myZone/starPosition/starPosition.js
var app = getApp()
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js')  //腾讯地图api
var qqmapsdk
var mz  //用于查询的数据库记录，一个json对象
var oriPositions  //索取到的所有记录
var toOri  //positions索引转oriPositions索引
var positions  //星标记录
var index  //当前记录positions的索引
var byDay  //按日期分组的记录，用于多项选择器显示
var by2pos  //从多项选择器的索引到positions中的index索引
var sureValue  //上一次点击确认时，多项选择器的结果

Page({
  data:{
    meta: null,  //时间信息
    input: null,  //内容信息
    photos: null,  //照片信息
    polyline: null,  //轨迹信息，用于导航
    markers: null,  //将位置信息用marker标记显示
    star: null,  //当前信息是否星标
    share: null,  //当前信息是否公开
    guide: null,  //是否选择导航
    pickerValue: null,  //多项选择器转动后的结果
    showList: null  //绑定多项选择器的数据
  },
  onLoad: function(){
    this.initial()
    this.mapCtx = wx.createMapContext('mainMap')  //加载地图
    qqmapsdk = new QQMapWX({  //获取api使用权
      key: app.globalData.apiKey
    })
    app.getMyZone((res)=>{  //获取原始数据
      mz = res
      this.transform()  //转化为可用数据
    })
  },
  onUnload:function(){  //注销页面
    //写点什么好呢
  },
  initial:function(){  //初始化全局变量，否则下一次进入当前页面时会保留上一次的数据；初始化data中的变量
    oriPositions = []
    toOri = []
    positions = []
    index = 0
    by2pos = []
    byDay = {day: [],value: []}
    sureValue = [0,0]
    this.setData({
      meta: '',
      input: '',
      photos: [],
      polyline: [{points:[]}],
      markers: [],
      pickerValue: [0,0],
      showList: [],
      star: false,
      share: false,
      guide: false
    })
  },
  transform: function(){  //转化数据，使用前记得调用initial
    mz.get().then(res=>{  //如果能查询到数据
      oriPositions = res.data.positions
      for(var i = 0;i != oriPositions.length;++i){
        if(oriPositions[i].star){
          positions.push(oriPositions[i])
          toOri.push(i)
        }
      }
      if(positions.length != 0){  //如果数据中存在位置数据，就可以开始正常执行了
        var day = ''  //通过时间分类
        for(var i = 0;i != positions.length;++i){
          var p = positions[i]
          var newDay = p.time.getFullYear().toString()+'/'+(p.time.getMonth()+1).toString()+'/'+p.time.getDate().toString()
          var input = '('+i.toString()+') '+p.value
          if(newDay != day){  //如果本条记录和上一条不是同一天
            day = newDay
            byDay.day.unshift(day)  //天数+1
            byDay.value.unshift([input])  //用一个新数组来记录位置数据的input
            by2pos.unshift([i])  //索引跟随byDay变化
          }else{
            byDay.value[0].unshift(input)  //否则将input直接放进上一天的数组里
            by2pos[0].unshift(i)
          }
          this.data.markers.push({  //markers数据也要更新
            iconPath: app.globalData.greenPath,
            id: i,
            latitude: p.latitude,
            longitude: p.longitude,
            width: 30,
            height: 30,
            label:{
              content: i.toString(),
              color: "#FF0000",
              fontSize: 20,
              anchorX: -5,
              anchorY: -55
            }
          })
        }
        this.data.showList.push(byDay.day)  //多项选择器的放进第一天第一条数据
        this.data.showList.push(byDay.value[0])
        this.show()  //展示meta、input和图片数据
      }else{  //如果暂无记录就直接返回
        app.navigateBack('暂无记录')
      }
    }).catch(res=>{  //网络问题什么的也一样
      app.navigateBack('未能获取记录')
    })
  },
  show: function(){  //展示记录内容
    this.data.markers[index].iconPath = app.globalData.greenPath  //更新markers和索引
    index = by2pos[sureValue[0]][sureValue[1]]
    this.data.markers[index].iconPath = app.globalData.redPath
    var position = positions[index]
    var meta = app.formatTime(position.time)
    if(position.star){  //如果是星标或者公开记录就加标识
      meta += '⭐'
    }
    if(position.share){
      meta += '💌'
    }
    this.setData({
      meta: meta,
      input: position.value,
      photos: position.photos,
      star: position.star,
      share: position.share
    })
    this.setData(this.data)  //更新marker
    this.mapCtx.moveToLocation({
      latitude: position.latitude,
      longitude: position.longitude
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
        if (res.confirm) {  //确认
          var photos = positions[index].photos  //注意这里用浅拷贝比用深拷贝更合适
          for(var i = toOri[index] + 1;i != oriPositions.length;++i){
            oriPositions[i - 1] = oriPositions[i]
          }
          oriPositions.pop()
          mz.update({
            data:{
              positions: oriPositions
            }
          }).then(res=>{
            if(res.stats.updated != 0){  //删除云端的照片
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
  statusChange: function(key,status){  //修改状态
    wx.showLoading({
      title: '修改中……',
    })
    positions[index][key] = status
    oriPositions[toOri[index]][key] = status
    mz.update({
      data:{
        positions:oriPositions
        }
    }).then((res)=>{
      wx.hideLoading()
      if(res.stats.updated != 0){
        wx.showToast({
          title: '更新成功',
          duration: 800
        })
        var meta = app.formatTime(positions[index].time)
        this.setData({
          [key]: status
        })
        if(this.data.star){
          meta += '⭐'
        }
        if(this.data.share){
          meta += '💌'
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
  IllBeThere:function(){
    var self = this
    var dest = positions[index]
    this.mapCtx.moveToLocation()
    qqmapsdk.direction({
      mode: 'walking',
      // from: e.detail.value.start,
      to: {
        latitude: dest.latitude,
        longitude: dest.longitude
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
      fail: function (error) {
        wx.showLoading({
          title: '导航失败',
        })
        setTimeout(wx.hideLoading,1000)
      }
    })
  },
  IWontBeThere:function(){
    this.setData({
      polyline:[{points:[]}],
      guide: false
    })
  }
})