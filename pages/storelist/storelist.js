const app = getApp();

Page({

  data: {
    selectedNav: '00',
    width: app.systemInfo.windowWidth,
    showspinner: false,
    nearby: [{
        name: '全部',
        id: 'a01',
      },
      {
        name: '汽车',
        id: 'a02',
      },
      {
        name: '游戏',
        id: 'a03',
      },
      {
        name: '动漫',
        id: 'a04',
      },
      {
        name: '食品',
        id: 'a05',
      },
    ],
    sort: [{
        name: '全部状态',
        id: 'b00'
      },
      {
        name: '创意',
        id: 'b01'
      },
      {
        name: '预热',
        id: 'b02'
      },
      {
        name: '众筹中',
        id: 'b03'
      },
      {
        name: '众筹成功',
        id: 'b04'
      }
    ],
    rank: [{
        name: '金额最多',
        id: 'c00',
      },
      {
        name: '评论最多',
        id: 'c01',
      },
      {
        name: '最新上线',
        id: 'c02',
      }
    ],
    spinners: [],
    storelist: [{
      name: '冒险游戏《基利斯督手记》',
      photo: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1758762147,1685935779&fm=26&gp=0.jpg',
      by: '故宫博物馆',
      price: '2000',
      rate: '100',
    }]

  },

  navitation(event) {
    let id = event.currentTarget.dataset.id;
    const that = this;
    console.log(id);
    if (id == that.data.selectedNav) {
      id = '00';
      that.setData({
        showspinner: false,
      })
    } else {
      that.setData({
        showspinner: true,
      })
    }
    console.log(id);
    that.setData({
      selectedNav: id,
    })
    let temps = that.data.spinners;
    if (id == '02') {
      temps = that.data.sort;
    } else if (id == '03') {
      temps = that.data.rank;
    } else if (id == '01') {
      temps = that.data.nearby;
    }
    that.setData({
      spinners: temps,
    })
  },

  spinnerclick(event) {
    const that = this;
    that.setData({
      showspinner: false,
    })
  },

  storelick(event) {
    const that = this;
    wx.navigateTo({
      url: '../store/store',
    })
  }
})