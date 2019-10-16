import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
var WxParse = require('../../../wxParse/wxParse.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applystatus: 1,
    title:''
  },

  applay: function () {
    let url = '/pages/company/appointment/appointment'
    modals.navigate(url)
  },
  onLoad: function (options) {
     let that=this
    let url3 = app.globalData.api + 'articles/cmj_desc'
    let data3 = {
    }
    request.sendRequest(url3, 'GET', data3, {})
      .then(function (res) {
        console.log(res.data.data)
        let content=res.data.data.content
        that.setData({
          title: res.data.data.title
        })
        WxParse.wxParse('detail', 'html', content, that, 5)
      }, function (err) {
      });
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})