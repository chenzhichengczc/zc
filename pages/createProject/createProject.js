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
  },


  


  onLoad: function (options) {
    wx.hideShareMenu({

    })
  },


  onShow: function () {
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

  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  bindPickerChange: function (e) {
    this.setData({
      roomTypeIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value,
      endDate: e.detail.value,
      endPickerStartDate: e.detail.value,
      endPickerEndDate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },


  onShareAppMessage: function (res) {
    wx.hideShareMenu();
  }
})