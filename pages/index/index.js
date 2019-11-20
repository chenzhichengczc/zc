//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    dataAmount: 3,
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    banner: ['http://img0.imgtn.bdimg.com/it/u=4137531265,3153855591&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=2048658562,1100726418&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2546124889,2579031657&fm=26&gp=0.jpg'
    ],
    goods: []
  },

  onLoad: function() {
    var that = this;
    wx.request({
      url: 'http://localhost/wx/project/list',
      method: 'get',
      data: {
        dataAmount: that.data.dataAmount
      },
      success: function(data) {
        if (data.data.code == 0) {
          that.setData({
            goods: data.data.data
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
  },

  fucClick(event) {
    const id = event.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../storelist/storelist',
    })

  },
  goodDetail(event) {
    wx.navigateTo({
      url: '../goods/goods?data=' + JSON.stringify(event.currentTarget.dataset.save),
      data: {
        save: event.currentTarget.dataset.save
      }
    })
  }

})