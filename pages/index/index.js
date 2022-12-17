//index.js

const app = getApp()  //获取应用实例

Page({
  data:{
    userInfo:{},  //用户信息
    hasUserInfo:false  //用于判明是显示登陆界面还是主界面
  },
  onLoad: function(){  //页面的构造
    if(app.globalData.userInfo){  //如果app那边先加载完且已被授权
      this.initial(app.globalData.userInfo)  //就赋值给userInfo
    }else{
      app.userInfoReadyCallback = res =>{  //否则给app写一个回调函数，如果授权成功则可以调用
        this.initial(res)
      }
    }
    // wx.navigateTo({
    //   url: '/pages/publicZone/publicZone',
    // })//测试用
  },
  initial: function(userInfo){  //将用户信息赋值给data
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    })
  },
  getUserInfo: function(e){  //登陆界面唯一按钮的功能：登录
    if(e.detail.errMsg === 'getUserInfo:ok'){
      app.globalData.userInfo = e.detail.userInfo
      this.initial(e.detail.userInfo)
    }
  }
})