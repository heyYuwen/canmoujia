import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
var app = getApp()
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
    content:''
  },

  applay:function(){
    let url = '/pages/company/appointment/appointment'
    modals.navigate(url)
  },
  onLoad: function (options) {
    
    let id=options.id
    let that = this
    let url = app.globalData.api + 'articles/'+id
    let data = {
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        console.log(res.data)
        let content=res.data.content
        that.setData({
          article: res.data
        })
        WxParse.wxParse('detail', 'html', content, that, 5)
      }, function (err) {
      });
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