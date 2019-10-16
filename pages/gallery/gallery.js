import modals from '../../class/methods/methods.js'
const request = require('../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    changenav:['类型','风格','价格'],
    currentindex:1,
    contentlist:[],
    market1:['不限','北欧风','星巴克','中式','地中海','日式','韩式田园'],
    market2: ['不限', '北欧风', '星巴克', '中式', '地中海', '日式', '韩式田园'],
    market3: ['不限', '北欧风', '星巴克', '中式', '地中海', '日式', '韩式田园'],
    currentmarket1:0,
    currentmarket2: 0,
    currentmarket3: 0,
    coverstatus:2,
    priceid:'',
    typeid:'',
    styleid:'',
    loginstatus:0
  },
  // 关闭弹窗
  close:function(){
   this.setData({
     coverstatus:2
   })
  },
  // 装修效果图选项卡
  changenav: function (e) {
    let that=this
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      currentindex: index,
      // market: that.data.changenav[index].decorat_render_prop_value,
      coverstatus:1
    })
  },
  // 跳转详情
  todetail:function(e){
    let photos=e.currentTarget.dataset.item.photos
    wx.navigateTo({
      url: '/pages/gallery/picture/picture?photos='+JSON.stringify(photos),
    })
  },
  selectmarket2: function (e) {
    let currentindex = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let that = this
    that.setData({
      currentmarket2: currentindex,
      typeid: id,
      coverstatus: 2
    })
    that.search()
  },
  selectmarket3: function (e) {
    let currentindex = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let that = this
    that.setData({
      currentmarket3: currentindex,
      styleid: id,
      coverstatus: 2
    })
    that.search()
  },
  // 选择标签
  selectmarket1:function(e){
    let currentindex = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let that = this
    that.setData({
      priceid: id,
      currentmarket1: currentindex,
      coverstatus: 2
    })
    that.search()
  },
  // 搜索封装
  search:function(){
    let that=this
    var arr = [];
    arr.push(that.data.priceid);
    arr.push(that.data.typeid);
    arr.push(that.data.styleid);
    var str = arr.join(',');
    console.log(str)
    let url = app.globalData.api + 'albums'
    let data = {
      prop_value_ids: str,
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        console.log(res.data.data)
        that.setData({
          contentlist: res.data.data
        })
      }, function (err) {
      });
    this.setData({
      coverstatus: 2
    })
  },
  onLoad: function (options) {
    let that=this
    //  一级二级标签分类
    let url = app.globalData.api + 'decorat_render_prop'
    let data= {}
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        console.log(res.data)
        that.setData({
          changenav:res.data,
          priceid: res.data[0].decorat_render_prop_value[0].id,
          typeid: res.data[1].decorat_render_prop_value[0].id,
          styleid: res.data[2].decorat_render_prop_value[0].id,
          market1: res.data[0].decorat_render_prop_value,
          market2: res.data[1].decorat_render_prop_value,
          market3: res.data[2].decorat_render_prop_value,
        })
        that.search()
      }, function (err) {
      });
  
  },
  // 获取手机号
  getPhoneNumber: function (e) {
    //  console.log(e)
    let that = this
    console.log(wx.getStorageSync('token'))
    console.log(wx.getStorageSync('code'))
    let code = wx.getStorageSync('code')
    wx.request({
      url: 'https://wap.mjia.cc/api/mp/members/phone',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync('token')}`,
      },
      data: {
        code: code,
        iv: e.detail.iv,
        encrypted_data: e.detail.encryptedData
      },
      success: function (res) {
        // console.log(res,"sssssssssssssss")
        let phone = res.data.msg
        wx.setStorageSync('phone', phone)
        that.setData({
          loginstatus: 0
        })
      }
    })
  },
  onShow:function(){
    let that = this
    if (!wx.getStorageSync('phone')) {
      that.setData({
        loginstatus: 1
      })
    }
  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})