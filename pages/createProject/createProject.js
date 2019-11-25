const app = getApp();
const util = require("../../utils/util.js")
Page({
  /*
   * 页面的初始数据
   */
  data: {
    startDate: '',
    startTime: '08:00',
    startPickerStartDate: '',
    startPickerEndDate: '',
    endDate: '',
    endTime: '08:00',
    endPickerStartDate: '',
    endPickerEndDate: '',
    wxLogin: false

  },





  onLoad: function(options) {
    wx.hideTabBar({})

    var that = this;
    wx.getSetting({
      success: function(e) {
        if (e.authSetting['scope.userInfo']) {
          that.setData({
            wxLogin: true
          })
          wx.showTabBar({})
        }
      }
    })
  },


  onShow: function() {
    if ((new Date()).getHours() <= 18) {
      var year = (new Date()).getFullYear()
      var month = (new Date()).getMonth() + 1
      var day = (new Date()).getDate() + 1
      var pickerStartDate = [year, month, day].map(this.formatNumber).join('-') + ''
      var pickerEndDate = [year, month, day].map(this.formatNumber).join('-') + ''
      this.setData({
        startDate: pickerStartDate,
        startPickerStartDate: pickerStartDate,
        endDate: pickerEndDate,
        endPickerStartDate: pickerEndDate
      })
    } else {
      var year = (new Date()).getFullYear()
      var month = (new Date()).getMonth() + 1
      var day = (new Date()).getDate() + 2

      var pickerStartDate = [year, month, day].map(this.formatNumber).join('-') + ''
      var pickerEndDate = [year, month, day].map(this.formatNumber).join('-') + ''
      this.setData({
        startDate: pickerStartDate,
        startPickerStartDate: pickerStartDate,
        endDate: pickerEndDate,
        endPickerStartDate: pickerEndDate
      })
    }
  },

  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  bindPickerChange: function(e) {
    this.setData({
      roomTypeIndex: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value,
      endDate: e.detail.value,
      endPickerStartDate: e.detail.value,
      endPickerEndDate: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },


  onShareAppMessage: function(res) {
    wx.hideShareMenu();
  },

  /**
   * userlogin 点击事件，进行数据存储
   */

  userlogin: function(e) {
    console.log(e)
    var that = this;
    //没有授权用户信息 , 拒绝
    if (!e.detail.rawData) {
      wx.showToast({
        title: '授权失败，请授权使用',
        icon: "none",
        duration: 3000
      })
      that.setData({
        wxlogin: true
      })
      return;
    }

    wx.request({
      url: 'http://localhost/wx/api/user/decodeUserInfo',
      data: {
        openId: app.globalData.openId, //用户的唯一标识
        nickName: e.detail.userInfo.nickName, //微信昵称
        avatarUrl: e.detail.userInfo.avatarUrl, //微信头像
        province: e.detail.userInfo.province, //用户注册的省
        city: e.detail.userInfo.city, //用户注册的市
        gender: e.detail.userInfo.gender, //用户性别
        country: e.detail.userInfo.country //用户所在国家
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      method: "post",
      success: function(e) {
        if (e.data.code == 0) {
          wx.showToast({
            title: '授权已经成功',
            mask: true,
            duration: 2000,
            success: function() {
              that.setData({
                wxLogin: true
              })

              wx.showTabBar({})
            }
          })
        } else {
          wx.showModal({
            title: '授权通知',
            content: '为了体验建议告诉我们您的微信公开信息，绝对不会泄露隐私噢！',
          })
        }
      },
      fail: function() {
        wx.showModal({
          title: '服务器异常',
          content: '服务器异常，请联系工程师',
          showCancel: false
        })
      }
    })
  }
})