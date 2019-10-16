import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    design: ['/images/company/xxyes.png', '/images/company/xxyes.png', '/images/company/xxyes.png', '/images/company/xxno.png', '/images/company/xxno.png'],
    sever: ['/images/company/xxyes.png', '/images/company/xxyes.png', '/images/company/xxyes.png', '/images/company/xxno.png', '/images/company/xxno.png'],
    working: ['/images/company/xxyes.png', '/images/company/xxyes.png', '/images/company/xxyes.png',
      '/images/company/xxno.png', '/images/company/xxno.png'],
      nav:[{name:'全部',num:'3410'},
        { name: '好评', num: '2800' },
        { name: '中评', num: '1200' },
        { name: '差评', num: '12' }
      ],
    current:0,
    evaluateslist:[],
    toppj:'',
    id:""
  },

  seeall:function(e){
    let that=this
    let index = e.currentTarget.dataset.index
    this.setData({
      current:index
    })
    let status=''
    if(index==0){
      that.all()
    }else if(index==1){
      status='good' 
      that.other(status)     
    }else if(index==2){
      status = 'medium'
      that.other(status)  
    }else{
      status = 'bad '
      that.other(status)  
    }
  },
  onLoad: function (options) {
    // 业主评价
    let id=options.id
    let that=this
    that.setData({
      id:id
    })
    that.all(id)
  },
  // 全部的评论
  all:function(){
    let that=this
    let id=that.data.id
    let url2 = app.globalData.api + 'evaluates'
    let data2 = {
      company_id: id
    }
    request.sendRequest(url2, 'GET', data2, {})
      .then(function (res) {
        console.log(res.data)
        that.setData({
          evaluateslist: res.data.evaluates.data,
          toppj: res.data.avgGrades
        })
      }, function (err) {
      });
  },
  other:function(status){
    let that = this
    let id = that.data.id
    let url2 = app.globalData.api + 'evaluates'
    let data2 = {
      company_id: id,
      status:status
    }
    request.sendRequest(url2, 'GET', data2, {})
      .then(function (res) {
        that.setData({
          evaluateslist: res.data.evaluates.data,
        })
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