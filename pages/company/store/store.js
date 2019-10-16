import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    banner: ['/images/index/banner.png', '/images/index/banner.png', '/images/index/banner.png'],
    scrollcon:[1,2,3,5,5,5,7],
    list:[1,2,3,1],
    app1status:0,
    contentlist:[],
    evaluateslist:[],
    id:'',
    companydetail:'',
    alldesigners:''
  },

  companyinfo:function(){
    let sever = this.data.companydetail.note
    let url ='/pages/company/commesg/commesg'
    modals.navigate(url)
    wx.setStorageSync('note', sever)
  },
  allsever:function(){
    let sever = this.data.companydetail.special_services
    let url = '/pages/company/teseservice/teseservice?item='
    modals.navigate(url, JSON.stringify(sever))
  },
  allpj:function(){
    let id=this.data.id
    let url = '/pages/company/ownerpj/ownerpj?id='
    modals.navigate(url,id)
  },
  close:function(){
    this.setData({
      app1status: 0
    }) 
  },
  app1:function(){
    this.setData({
      app1status:1
    })
  },
  app2: function () {
    this.setData({
      app1status: 2
    })
  },
  // 免费报价
  freemoney:function(){
    let url = '/pages/company/appointment/appointment'
    modals.navigate(url)
  },
  // 免费报价表单提交
  tosubmit:function(e){
    let name = e.detail.value.username
    let phone = e.detail.value.userphone
    let that=this
    if(!name){
      modals.showToast('您的姓名为空','loading')
    }else if(!phone){
      modals.showToast('您的手机号为空', 'loading')
    }else if(phone.length!=11){
      modals.showToast('您的手机号有误', 'loading')
    }else{
       if ((/^1[34578]\d{9}$/.test(phone))) {
         let url = app.globalData.api + 'tenders'
         let data = {
           name: name,
           mobile: phone,
           service_need: 'free_offer',
         }
         request.sendRequest(url, 'post', data, {})
           .then(function (res) {
             console.log(res.data)
             modals.showToast('提交成功', 'success')
             that.setData({
               app1status: 0
             })
           }, function (err) {
           });
      }
    }
  },
  // 更多装修案例
  zxanli:function(){
    let url = '/pages/gallery/gallery'
    modals.switchtab(url)
  },
  // 设计师详情页
  desingerdetail:function(e){
    let userid=e.currentTarget.dataset.id
    let url = '/pages/company/designteam/designteam?userid='
    modals.navigate(url,userid)
  },
  // 设计团队
  desingerteam: function () {
    let alldesigners = this.data.alldesigners
    let url = '/pages/company/team/team?alldesigners='
    modals.navigate(url, JSON.stringify(alldesigners))
  },
  onLoad: function (options) {
    let that=this
    console.log(options.id)
    let id=options.id
    // 公司详情companies
    let url3 = app.globalData.api + 'companies/'+id
    let data3 = {
      // id:id
    }
    request.sendRequest(url3, 'GET', data3, {})
      .then(function (res) {
        console.log(res.data)
        that.setData({
          companydetail: res.data
        })
        let content = res.data.discount[0].content
        WxParse.wxParse('detail', 'html', content, that, 5)
      }, function (err) {
      });
    // 设计团队
    let url = app.globalData.api + 'designers?company_id='+id
    let data = {
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        let contentlist = res.data.data
        that.setData({
          alldesigners: contentlist
        })
        if (contentlist.length<=5){
          that.setData({
            contentlist: contentlist
          })
        }else{
          let arr=contentlist.slice(0,5)
          that.setData({
            contentlist: arr
          })
        }
        
      }, function (err) {
      });
      // 业主评价
    let url2 = app.globalData.api + 'evaluates'
    let data2 = {
      company_id:id,
      status:'good'
    }
    request.sendRequest(url2, 'GET', data2, {})
      .then(function (res) {
        // console.log(res.data.evaluates.data)
        let pllist =[]
        if (res.data.evaluates.data.length>3){
          pllist = res.data.evaluates.data.slice(0, 3) 
        }else{
          pllist = res.data.evaluates.data
        }
        // console.log(pllist)
        that.setData({
          evaluateslist: pllist,
          id:id
        })
      }, function (err) {
      });
    console.log(this.data.companydetail,'sssssssss')
  },
//  案例详情
  todetail:function(e){
    let photos = e.currentTarget.dataset.item.photos
    console.log(photos)
    wx.navigateTo({
      url: '/pages/gallery/picture/picture?photos=' + JSON.stringify(photos),
    })
  },
 
  onShow: function () {

  },

  
  onShareAppMessage: function () {

  }
})