//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    width: app.systemInfo.windowWidth,
    height: app.systemInfo.windowHeight,
    banner: ['http://img0.imgtn.bdimg.com/it/u=4137531265,3153855591&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=2048658562,1100726418&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2546124889,2579031657&fm=26&gp=0.jpg'
    ],
    functions: [{
        url: '../../images/i01.png',
        name: '婚礼策划',
        id: '01'
      },
      {
        url: '../../images/i02.png',
        name: '婚纱摄影',
        id: '02'
      },
      {
        url: '../../images/i03.png',
        name: '婚宴酒店',
        id: '03'
      },
      {
        url: '../../images/i04.png',
        name: '婚礼用车',
        id: '04'
      },
      {
        url: '../../images/i05.png',
        name: '婚礼用品',
        id: '05'
      },
      {
        url: '../../images/i06.png',
        name: '金银首饰',
        id: '06'
      },
    ],

    goods: [{
      url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1758762147,1685935779&fm=26&gp=0.jpg',
      name: '冒险游戏《基利斯督手记》',
      price: '13800',
      sell: '5',
      depict: '基督”一词的详写，为天主教的称呼',
      by: '超级跑车',
    }]
  },

  onLoad: function() {

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
      url: '../goods/goods',
    })
  }

})