import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

 
  onLoad: function (options) {
   console.log(JSON.parse(options.item))
   let that=this
   that.setData({
     list: JSON.parse(options.item)
   })
  },
  btn:function(){
    let url ='/pages/company/appointment/appointment'
    modals.navigate(url)
  },
  
  onShow: function () {

  },

  
})