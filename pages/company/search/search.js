// pages/company/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['家庭装修','店铺装修','公司装修','酒店装修','公寓装修'],
    list2:['中小型','全国连锁','城市连锁'],
    list3: ['0-15万', '10-15万', '50-100万', '100-500万', '500万以上'],
    index1:0,
    index2: 2,
    index3: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 服务项目
  selet1:function(e){
  let index=e.currentTarget.dataset.index
  this.setData({
    index1:index
  })
  },
  // 服务项目
  selet2: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      index2: index
    })
  },
  // 服务项目
  selet3: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      index3: index
    })
  },
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