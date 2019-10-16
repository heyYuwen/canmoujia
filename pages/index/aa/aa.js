import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider: [
      { imgId: '0', linkUrl: 1, image: '/images/index/banner.png' },
      { imgId: '1', linkUrl: 2, image: '/images/index/banner.png' },
      { imgId: '2', linkUrl: 3, image: '/images/index/banner.png' },
    ],
    swiperCurrent: 0,
    imgurl: app.globalData.imgurl,
    navData:['按价格','按数量','安装修'],
    currentTab:0
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.index;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var that = this;
    var cur = event.detail.current;
    var navid = that.data.navData[cur].id
    this.setData({
      currentTab: cur,
    });
    // 切换请求
    wx.request({
      url: app.globalData.apiUrl + '/api/goods_spu/index/category_id/' + navid,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var appUrl = app.globalData.apiUrl + '/uploads/goods/'
        that.setData({
          goods_arry: res.data.data.data.data,
          url: appUrl,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this
    // let url = app.globalData.api + 'albums'
    // let data = {
    //   id: 3,
    //   per_page: 12,
    //   page: 1
    // }
    // request.sendRequest(url, 'GET', data, {})
    //   .then(function (res) {
    //     console.log(res.data.data)
    //     that.setData({
    //       slider: res.data.data
    //     })
    //   })
  },
  /**
* 轮播图
*/
  swiperChange: function (e) {
    //把切换后当前的index传给<swiper>组件的current属性
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
//点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})