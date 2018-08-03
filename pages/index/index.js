//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{
        id:'5',
        name: '123',
        date: '2017-08-03',
        price: "6.00",
        note: '无备注'
      },{
        id: '4',
        name: '餐饮',
        date: '2017-07-31',
        price: "6.00",
        note: '无备注'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(0);
    wx.navigateTo({
      url: '../account/account'
    })
  },
  onLoad: function () {
    // this.getList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getList: function(){
    let that = this;
    wx.request({
      url: 'http://localhost:3001/account/index?startTime=&endTime=&page=0&sort=1',
      data: {
        startTime: '',
        endTime: '',
        page: 0,
        sort: '1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
