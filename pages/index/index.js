import modals from '../../class/methods/methods.js'
const request = require('../../class/api/https.js')
const app = getApp()

Page({
  data: {
    banner: ['/images/index/banner.png', '/images/index/banner.png', '/images/index/banner.png'],
    nav: [
      { img: '/images/index/the3.png', text: '免费报价' },
      { img: '/images/index/the1.png', text: '免费设计' },
      { img: '/images/index/the4.png', text: '装修资讯' }
      ],
    arraylist:[],
    scrollcon:[],
    changenav:['按风格','按分类','按价格'],
    currentindex:0,
    bancurrentindex:0,
    notelist: [],
    loginstatus:0,
    imgurl: app.globalData.imgurl,
    pagenum:0,
    list:[]
  },
  aa:function(e){
    var cur = e.detail.current;
    console.log(cur)
    this.setData({
      bancurrentindex: cur,
    });
  },
  // 导航按钮
  btnnav:function(e){
   let index=e.currentTarget.dataset.index;
   console.log(index)
   if(index==1){
     let url ='/pages/company/freedesign/freedesign'
     modals.navigate(url)
   } else if (index == 0){
     let url ='/pages/calculator/calculator'
     modals.switchtab(url)
   }else if(index==2){
     let url = '/pages/index/decorateschool/decorateschool'
     modals.navigate(url)
   }
  },
  // 免费设计
  freedesign:function(){
    let url = '/pages/company/freedesign/freedesign'
    modals.navigate(url)
  },
  // 急速报价
  baojia:function(){
    let url = '/pages/calculator/calculator'
    modals.switchtab(url)
  },
  school:function(){
    let url = '/pages/index/decorateschool/decorateschool'
    modals.navigate(url)
  },
  // 装修效果图选项卡
  changenav:function(e){
    console.log(e)
    let that=this
    let index=e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.id
    this.setData({
      currentindex:index
    })
    that.search()
  },
  switchTab(event) {
    var that = this;
    var cur = event.detail.current;
    console.log(cur)
    this.setData({
      currentindex: cur,
    });
    that.search()
  },
  search:function(){
    let that = this
    let nav = that.data.changenav
    var index=that.data.currentindex
    let id=nav[index]
    let url = app.globalData.api + 'albums'
    let data = {
      id: id,
      per_page: 12,
      page: 1
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        let array=res.data.data
        let list=[]
        if(index==0){
          array.splice(4,11)
          // console.log(array)
          that.setData({
            list:array
          })
        }else if(index==1){
          for(let i=4;i<8;i++){
            list.push(array[i])
          }
          console.log(list)
          that.setData({
            list: list
          })
        }else if(index==2){
          array.splice(0,8)
          console.log(array)
          that.setData({
            list: array
          })
        }
      })
  },
  
  onLoad: function () {
   let that=this;
    //  轮播图
    let url = app.globalData.api + 'banners'
    let data = {}
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        // console.log(res.data)
        that.setData({
          banner: res.data
        })
      }, function (err) {
    });
    // 装修效果图一级标签分类
    let url2 = app.globalData.api + 'decorat_render_prop'
    let data2 = {}
    request.sendRequest(url2, 'GET', data2, {})
      .then(function (res) {
        // console.log(res.data)
        that.setData({
          changenav: res.data
        })
        that.search()
      }, function (err) {
    });
    that.onReachBottom()
  },
  onShow:function(){
    let that=this
    if (!wx.getStorageSync('token')) {
      that.setData({
        loginstatus: 1
      })
    }
    
  },
  // 装修资讯详情
  todetail:function(e){
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    let url = '/pages/index/information/information?id='
    modals.navigate(url,id)
  },
  // 查看更多装修资讯
  seeall:function(){
    let url = '/pages/index/decorateschool/decorateschool'
    modals.navigate(url)
  },
  // 查看更多装修风格
  seemore: function () {
    let url = '/pages/gallery/gallery'
    modals.switchtab(url)
  },
   // 授权
  onGotUserInfo:function(e){
    let that=this
    // console.log(e.detail)
    if (e.detail){
    // console.log(wx.getStorageSync('code'))
    let code = wx.getStorageSync('code')
        wx.request({
          url: 'https://wap.mjia.cc/api/mp/members/login',
          method: 'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            code: code,
            iv: e.detail.iv,
            encrypted_data: e.detail.encryptedData
          },
          success: function (res) {
            // console.log(res.data.token)
            let token=res.data.token
            wx.setStorageSync('token', token)
            that.setData({
              loginstatus:0
            })
          }
        })
    }else{
      wx.openSetting({
        success: (res) => {
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
              let userinfo = res.userInfo
              // that.setUser(userinfo)
            }
          })
        }
      })
    }
  },
  // 获取手机号
  getPhoneNumber:function(e){
   //  console.log(e)
   let that=this
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
          loginstatus:0
        })
      }
    })
  },
  // 图册 详情
  tophonto:function(e){
    console.log(e.currentTarget.dataset.item)
    let photos = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/gallery/picture/picture?photos=' + JSON.stringify(photos),
    })
  },
  // 触底
  onReachBottom: function () {
    // 装修资讯
    let that=this
    let pagenum=that.data.pagenum
    pagenum++
    let url3 = app.globalData.api + 'articles'
    let data3 = {
      per_page:5,
      page:pagenum
    }
    request.sendRequest(url3, 'GET', data3, {})
      .then(function (res) {
        // console.log(res.data.data)
        let re_data=res.data.data
        that.data.list.concat(re_data)
        // console.log(that.data.list)
        that.setData({
          list: that.data.list.concat(re_data),
          pagenum: pagenum
        })
        // console.log(that.data.list, that.data.pagenum)
      }, function (err) {
      });
  },
  // // 装修效果图分类下的类容
  // typecontent:function(id){
  //   let that=this
  //   let url = app.globalData.api + 'albums'
  //   let data = {
  //     id: id,
  //     per_page: 12,
  //     page: 1
  //   }
  //   request.sendRequest(url, 'GET', data, {})
  //     .then(function (res) {
  //       console.log(res.data.data)
  //       let list=res.data.data
  //       let arr=[]
  //       let a1 =[]
  //       var subArr =[]
  //       for(let i=0;i<list.length;i++){
  //          if(i%3==0){
  //           subArr= list.slice(i, i+3);
  //            arr.push(subArr)
  //           that.setData({
  //             arraylist:arr
  //           })
  //          }
  //       }
  //       console.log(arr)
  //       that.setData({
  //         typecontent: res.data.data
  //       })
  //     }, function (err) {
  //     });
  // },
})
