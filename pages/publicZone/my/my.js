// pages/publicZone/my/my.js
var app = getApp()
var mz
var oriLogs
var toOri
var logs
var index
var by2pos
var byDay
var sureValue
var principle
const names = ['track','position']
const chineseNames = {
  track: '轨迹',
  position: '位置'
}

Page({
  data:{
    meta: null,
    value: null,
    photos: null,
    polylines: null,
    markers:null,
    share: null,
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
    principle = []
    oriLogs = {track:[],position:[]}
    toOri = {track:[],position:[]}
    logs = {track:[],position:[]}
    index = {track: 0,position: 0}
    by2pos= {track:[],position:[]}
    byDay = {track:{day: [],value: []},position:{day: [],value: []}}
    sureValue = [0,0,0]
    this.setData({
      meta: '',
      value: '',
      photos: [],
      polylines: [{points:[]}],
      markers: [],
      share: true,
      pickerValue: [0,0,0],
      showList: [[]]
    })
  },
  transformHalf: function(kind){
    for(var i = 0;i != oriLogs[kind].length;++i){
      if(oriLogs[kind][i].share){
        logs[kind].push(oriLogs[kind][i])
        toOri[kind].push(i)
      }
    }
    var day = ''
    for(var i = 0;i != logs[kind].length;++i){
      var t = logs[kind][i]
      var temp = kind === 'track' ? 'startTime' : 'time'
      var newDay = t[temp].getFullYear().toString()+'/'+(t[temp].getMonth()+1).toString()+'/'+t[temp].getDate().toString()
      var input = '('+i.toString()+') '+t.value
      if(newDay != day){
        day = newDay
        byDay[kind].day.unshift(day)
        byDay[kind].value.unshift([input])
        by2pos[kind].unshift([i])
      }else{
        byDay[kind].value[0].unshift(input)
        by2pos[kind][0].unshift(i)
      }
    }
  },
  transform:function(){
    mz.get().then(res=>{
      for(var i = 0;i != names.length;++i){
        oriLogs[names[i]] = res.data[names[i]+'s']
        this.transformHalf(names[i])
        if(logs[names[i]].length != 0){
          principle.push(names[i])
          this.data.showList[0].push(chineseNames[names[i]])
        }
      }
      if(principle.length === 0){
        app.navigateBack('暂无公开记录')
      }else{
        this.data.showList.push(byDay[principle[0]].day)
        this.data.showList.push(byDay[principle[0]].value[0])
        this.show()
        this.setData(this.data)
      }
    })
  },
  show: function(){
    var kind = principle[sureValue[0]]
    index[kind] = by2pos[kind][sureValue[1]][sureValue[2]]
    var log = logs[kind][index[kind]]
    var meta = kind === 'position'? app.formatTime(log.time) : '起始时间：'+app.formatTime(log.startTime)
    if(log.star){
      meta += '⭐'
    }
    if(log.share){
      meta += '💌'
    }
    if(kind === 'position'){
      this.setData({
        meta: meta,
        value: log.value,
        photos: log.photos,
        share: log.share
      })
      this.setData(this.data)  //更新marker
      this.mapCtx.moveToLocation({
        latitude: log.latitude,
        longitude: log.longitude
      })
    }else{
      meta += '\n终止时间：'+app.formatTime(log.endTime)
      if(log.polyline.points.length == 0){
        meta += '\n(无轨迹数据)'
      }else{
        this.mapCtx.moveToLocation({
          latitude: log.polyline.points[0].latitude,
          longitude: log.polyline.points[0].longitude
        })
      }
      this.setData({
        meta: meta,
        value: log.value,
        polylines: [log.polyline],
        photos: log.photos,
        share: log.share
      })
    }
  },
  pickerSure:function(e){
    sureValue = [e.detail.value[0],e.detail.value[1],e.detail.value[2]]
    this.show()
  },
  pickerChange:function(e){
    this.data.pickerValue[e.detail.column] = e.detail.value
    this.data.showList[1] = byDay[principle[this.data.pickerValue[0]]].day
    this.data.showList[2] = byDay[principle[this.data.pickerValue[0]]].value[this.data.pickerValue[1]]
    this.setData(this.data)
  },
  delete: function(){
    var self = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除本记录',
      success (res) {
        if (res.confirm) {
          var kind = principle[sureValue[0]]
          var photos = logs[kind][index[kind]].photos
          for(var i = toOri[kind][index[kind]] + 1;i != oriLogs[kind].length;++i){
            oriLogs[kind][i - 1] = oriLogs[kind][i]
          }
          oriLogs[kind].pop()
          mz.update({
            data:{
              [kind+'s']: oriLogs[kind]
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
  change: function(){
    var status = !this.data.share
    var kind = principle[sureValue[0]]
    wx.showLoading({
      title: '修改中……',
    })
    logs[kind][index[kind]].share = status
    oriLogs[kind][toOri[kind][index[kind]]].share = status
    mz.update({
      data:{
        [kind+'s']:oriLogs[kind]
        }
    }).then((res)=>{
      wx.hideLoading()
      if(res.stats.updated != 0){
        wx.showToast({
          title: '更新成功',
          duration: 800
        })
        this.show()
      }else{
        wx.showLoading({
          title: '更新失败',
        })
        setTimeout(wx.hideLoading,1000)
      }
    })
  }
})