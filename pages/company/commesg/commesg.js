import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
var WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applystatus:1,
    content:''
  },

  applay: function () {
    let url = '/pages/company/appointment/appointment'
    modals.navigate(url)
  },
  onLoad: function (options) {
    // console.log(options.item)
    // let content = JSON.parse(options.item)
   
  //  articles/cmj_desc
 
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
    let content = wx.getStorageSync('note')
    WxParse.wxParse('detail', 'html', content, this, 5)
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