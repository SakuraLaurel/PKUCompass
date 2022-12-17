// pages/landscape/withoutMap/withoutMap.js
var app = getApp()

Page({
  data:{
    positions: []
  },
  onLoad: function(options){
    if(options.showAll === 'true'){
      for(var i = 0;i != app.globalData.landscape.length;++i){
        var lan = app.globalData.landscape[i]
        this.data.positions.push({
          name: lan.name,
          count: i,
          num: i
        })
      }
    }else{
      var count = 0
      for(var i = 0;i != app.globalData.landscape.length;++i){
        var lan = app.globalData.landscape[i]
        if(lan.latitude < 10){
          this.data.positions.push({
            name: lan.name,
            count: count,
            num: i
          })
          count += 1
        }
      }
    }
    this.setData(this.data)
  }
})