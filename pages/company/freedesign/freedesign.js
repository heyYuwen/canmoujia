import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homestyle: [1, 2, 3],
    city: [],
    region: ['湖北省', '武汉市', '江汉区'],
    form_v:''
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
    let name = e.detail.value.name;
    let phone = e.detail.value.phone;
    if (name == '') {
      modals.showToast('您的姓名为空', 'loading')
    } else if (phone == '') {
      modals.showToast('您的手机号为空', 'loading')
    }else if (phone.length < 11) {
      modals.showToast('手机号有误', 'loading')
    } else {
      if ((/^1[34578]\d{9}$/.test(phone))) {
        let addr_detail = that.data.region[0] + that.data.region[1] + that.data.region[2]
        let url = app.globalData.api + 'tenders'
        let data = {
          name: name,
          mobile: phone,
          addr_detail: addr_detail,
          service_need: 'free_offer',
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
  onLoad: function (options) {

  },

  onShow: function () {

  },

  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})