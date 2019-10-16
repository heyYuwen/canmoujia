import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [],
    selectareastatus:0,
    homestyle:['一室','两室','三室'],
    shi:1,
    ting:1,
    wei:1,
    city: [],
    region: ['湖北省', '武汉市', '江汉区'],
    form_v:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  
  // 选择室
  selectareas:function(){
    this.setData({
      selectareastatus: 1,
      homestyle:['1室','2室','3室','4室','5室']
    })
  },
  selectresult1:function(e){
    let index = e.currentTarget.dataset.index
    let homestyle = this.data.homestyle
    let shi = index + 1
    this.setData({
      shi: shi,
      selectareastatus: 0
    })
  },
  // 选择厅
  selectarea:function(){
    this.setData({
      selectareastatus:2,
      homestyle: ['1厅', '2厅', '3厅', '4厅']
      
    })
  },
  selectresult2:function(e){
    let index = e.currentTarget.dataset.index
    let homestyle = this.data.homestyle
    let ting = index + 1
    this.setData({
      ting: ting,
      selectareastatus:0
    })

  },
  // 选择卫
  selectwei:function(){
    this.setData({
      selectareastatus: 3,
      homestyle: ['1卫', '2卫', '3卫', '4卫']

    })
  },
  selectresult3:function(e){
    let index = e.currentTarget.dataset.index
    let homestyle = this.data.homestyle
    let wei = index + 1
    this.setData({
      wei: wei,
      selectareastatus: 0
    })
  },
  // 城市选择
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })

  },
  // 表单提交
  tosubmit: function (e) {
    let that = this
    console.log(e.detail.value)
    let name = e.detail.value.username;
    let phone = e.detail.value.phone;
    let housemj = e.detail.value.housemj;
    let shi = that.data.shi;
    let ting = that.data.ting;
    let wei = that.data.wei;
    // let city = that.data.multiArray[]
    if (name == '') {
      modals.showToast('您的姓名为空', 'loading')
    } else if (phone == '') {
      modals.showToast('您的手机号为空', 'loading')
    } else if (housemj == '') {
      modals.showToast('请填写房间面积', 'loading')
    } else if (phone.length < 11) {
      modals.showToast('手机号有误', 'loading')
    } else {
      if ((/^1[34578]\d{9}$/.test(phone))) {
        let arr = that.data.shi + '室' + that.data.ting + '厅' + that.data.wei + '卫'
        let addr_detail = that.data.region[0] + that.data.region[1] + that.data.region[2]
        let url = app.globalData.api + 'tenders'
        let data = {
          name: name,
          mobile: phone,
          addr_detail: addr_detail,
          floor_space: housemj,
          service_need: 'free_offer',
          room_type: arr,
          // td_attr_values:'重中之重'
        }
        request.sendRequest(url, 'post', data, {})
          .then(function (res) {
            console.log(res.data)
            modals.showToast('提交成功', 'success')
            setTimeout(function () {
              that.setData({
                form_v: ''
              })
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 1000)
          }, function (err) {
          });

      }
    }
  },
  onShow: function () {

  },

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