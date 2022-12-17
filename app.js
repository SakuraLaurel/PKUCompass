//app.js

var week = ['日','一','二','三','四','五','六']  //从时间格式转换为字符串用
var util = require('utils/util.js')  //转换时间用

App({
  onLaunch: function(){
    wx.cloud.init({  //选择'elaina'环境
      env: 'elaina',
      traceUser: true
    })
    wx.getSetting({  //申请获取用户信息和位置信息的权限
      success: (res) => {
        if(res.authSetting['scope.userInfo']){  //如果已经授权用户信息，没有的话只能通过index中的button来申请
          wx.getUserInfo({  //将信息存入globalData中的userInfo
            success:(res)=>{
              this.globalData.userInfo = res.userInfo
              if(this.userInfoReadyCallback){  //如果index先加载完（异步问题），那就回调将结果传入index页面
                this.userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }
      }
    })
    wx.cloud.callFunction({  //调用云函数，获取用户的openid（唯一标识）
      name: 'login',
      data:{},
      success: (res)=>{
        this.globalData.openid = res.result.openid
      }
    })
  },
  applyForLocation: function(){  //后期需要位置信息时，向用户发送申请授权
    wx.getSetting({
      success: (res) => {
        if(!res.authSetting['scope.userLocation']){  //如果没有授权才申请，有则不申请
          wx.authorize({
            scope: 'scope.userLocation'
          })
        }
      }
    })
  },
  getMyZone:function(callback){  //获得用户openid对应的云数据库记录引用
    const dz = wx.cloud.database().collection('zone')  //所有信息都存储在zone下
    dz.where({
      _openid: this.globalData.openid  //通过openid来查找
    }).get().then(res=>{
      if(res.data.length === 0){  //如果没有用户记录，说明是第一次使用
        dz.add({  //添加新用户的记录
          data:{
            positions:[],  //位置信息
            tracks:[],  //轨迹信息
            collections: [],  //收藏
            numOfPhotos:0  //照片数，用于给照片编号
          }
        }).then(obj=>{  //调用回调函数，把记录赋值
          callback(dz.doc(obj._id))
        })
      }else{  //如果已经有记录了，就直接赋值
        callback(dz.doc(res.data[0]._id))
      }
    })
  },
  formatTime:function(time){  //将json标准时间转换为字符串
    return (util.formatTime(time) + ' 星期' + week[time.getDay()])
  },
  navigateBack: function(title){
    wx.navigateBack({
      complete: () => {
        wx.showLoading({
          title: title,
        })
        setTimeout(wx.hideLoading,1000)
      },
    })
  },
  globalData:{  //全局变量
    userInfo:null,
    openid:'',
    address: "cloud://elaina.656c-elaina-1301951802/",  //云数据库的照片存储位置
    latitude: 39.993101,  //北京大学的经纬度
    longitude: 116.312385,
    greenPath: "/green.png",  //地图marker的两个标记
    redPath: "/red.png",
    apiKey: "3QLBZ-BYRCK-43WJO-AX4G7-GTIAF-FUFBG"
  }
})