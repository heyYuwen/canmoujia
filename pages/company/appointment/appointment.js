import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({
  data: {
    coverstatus:0,
    form_v:''
  },

  tosubmit:function(e){
    let that=this
  console.log(e.detail.value)
    let phone = e.detail.value.phone
    let name = e.detail.value.username
    let city = e.detail.value.city
    if (name==''){
      modals.showToast('姓名为空','loading')
    } else if (phone == ''){
      modals.showToast('手机号为空', 'loading')
    }else if(city==''){
      modals.showToast('城市为空', 'loading')
    } else if (phone.length!=11){
      modals.showToast('手机号有误', 'loading')
    }
    else{
      if ((/^1[34578]\d{9}$/.test(phone))){
        console.log('成功')
        let url = app.globalData.api + 'tenders'
        let data = {
          name: name,
          mobile: phone,
          addr_detail:city,
          service_need: 'free_offer'
        }
        request.sendRequest(url, 'post', data, {})
          .then(function (res) {
            console.log(res.data)
            modals.showToast('提交成功', 'success')
            setTimeout(function () {
              that.setData({
                form_v: '',
                coverstatus: 1
              })
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000)
          }, function (err) {
          });

      }
    }
    

  },
  makesure:function(){
  this.setData({
    coverstatus:0
  })
  },
  onLoad: function (options) {

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