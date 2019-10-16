//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        let code=res.code
        wx.setStorageSync('code', code)
        // console.log(wx.getStorageSync('code'))
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // wx.request({
              //   url: 'http://www.mcode.com/api/mp/members/login',
              //   method: 'post',
              //   header: {
              //     "Content-Type": "application/x-www-form-urlencoded"
              //   },
              //   data: {
              //     code: code,
              //     iv:res.iv,
              //     encrypted_data: res.encryptedData
              //   },
              //   success: function (res) {
              //     console.log(res.data.token)
              //   }
              // })
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    api:'https://wap.mjia.cc/api/mp/',
    imgurl:'https://wap.mjia.cc'
  }
})