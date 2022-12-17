// pages/campusService/information/information.js
var app = getApp()

Page({
  data:{
    logs:[],
    kind: ''
  },
  onLoad: function(options){
    this.setData({
      kind : options.type
    })
    if(this.data.kind != 'contact'){
      for(var i = 0;i != app.globalData.service[this.data.kind].length;++i){
        var log = app.globalData.service[this.data.kind][i]
        if(typeof(log.content) === 'object'){
          var first = []
          var second = []
          for(var j = 1;j != log.content.length;++j){
            first.push(log.content[j][0])
          }
          for(var j = 1;j != log.content[0].length;++j){
            second.push(log.content[0][j])
          }
          this.data.logs.push({
            type: 'object',
            name: log.name,
            content: log.content,
            addition: log.addition,
            value: [0,0,0],
            first: first,
            second: second,
            third: [log.content[1][1]],
            change: 'change' + i.toString()
          });
          ((num)=>{
            this['change'+num.toString()] = (e)=>{
              var self = this.data.logs[num]
              self.value = [e.detail.value[0],e.detail.value[1],0]
              self.third = [self.content[self.value[0] + 1][self.value[1] + 1]]
              this.setData(this.data)
            }
          })(i)
        }else{
          this.data.logs.push({
            type: 'string',
            name: log.name,
            content: log.content
          })
        }
      }
    }else{
      for(var i = 0;i != app.globalData.service.contact.length;++i){
        var log = app.globalData.service.contact[i]
        this.data.logs.push({
          name: log.name,
          content: log.content
        })
      }
    }
    this.setData(this.data)
  }
})