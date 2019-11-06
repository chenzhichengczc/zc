//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    const that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getSystemInfo({
      success: function(res) {
      that.systemInfo = res;
      }
    })
    //获取授权信息
    that.login();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  login: function () {
    var that = this;

    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          wx.request({
            url: 'http://localhost/wx/user/getUserInfo',
            data: {
              appid: "wxfd945e2b4a767dc3",
              secret: "85a7570f2625d55bc2c6e9016ad2c1d7",
              js_code: res.code,
              grantType: 'authorization_code',

            },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              if (res.data.code == 500) {
                that.globalData.usinfo = 0;
                return;
              }
              if (res.data.code != 0) {
                wx.hideLoading();
                wx.showModal({
                  title: "提示",
                  content: "无法登录，请重试",
                  showCancel: false
                });
                return;
              }
              that.globalData.openId = res.data.data.openid;
              that.globalData.token = res.data.data.access_token;
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null
  },
  systemInfo: null,

})