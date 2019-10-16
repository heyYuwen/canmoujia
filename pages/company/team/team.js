import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({
  data: {
    scrollcon: [1, 2, 3, 5, 5, 5, 7],
    designlist:[],
    imgurl: app.globalData.imgurl,
  },

  onLoad: function (options) {
    let that=this
    console.log(JSON.parse(options.alldesigners))
    that.setData({
      designlist: JSON.parse(options.alldesigners)
    })
  },
  todetail:function(e){
    // console.log(e.currentTarget.dataset.item.photos)
    let photos = e.currentTarget.dataset.item.photos
    wx.navigateTo({
      url: '/pages/gallery/picture/picture?photos=' + JSON.stringify(photos),
    })
  },
  // 设计师详情
  todetail:function(e){
    let userid = e.currentTarget.dataset.id
    let url = '/pages/company/designteam/designteam?userid='
    modals.navigate(url, userid)
  }


})