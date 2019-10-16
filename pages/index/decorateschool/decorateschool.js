import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    changenav:['流程装修','装修资讯','装修常识'],
    currentindex:1,
    coverstatus: 2,
    market1: [],
    market2:[],
    market3:[],
    notelist: [],
    currentmarket1:0,
    currentmarket2: 0,
    currentmarket3: 0
  },

  // 装修效果图选项卡
  changenav: function (e) {
    let that=this
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.setData({
      currentindex: index,
      coverstatus: 1,
    })
  },
  // 选择标签
  selectmarket1: function (e) {
    let that=this
    let index = e.currentTarget.dataset.index
    let id=e.currentTarget.dataset.item.id
    this.setData({
      currentmarket1: index,
      coverstatus: 2,
    })
    console.log(id)
    that.articlelist(id)
  },
  selectmarket2: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.id
    this.setData({
      currentmarket2: index,
      coverstatus: 2,
    })
    console.log(id)
    that.articlelist(id)
  },
  selectmarket3: function (e) {
    let that = this
    console.log(e.currentTarget.dataset.item)
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.id
    this.setData({
      currentmarket3: index,
      coverstatus: 2,
    })
    console.log(id)
    that.articlelist(id)
  },
  // 根据id查询分类列表
  articlelist:function(id){
    let that = this
    let url = app.globalData.api + 'articles'
    let data = {
      article_type_id:id
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        console.log(res.data.data)
        that.setData({
          notelist: res.data.data
        })
      }, function (err) {
      });
  },
  // 文章详情
  todetail:function(e){
   console.log(e)
   let id=e.currentTarget.dataset.id
    let url = '/pages/index/information/information?id='
    let value=id
    modals.navigate(url,id)
  },
  close:function(){
   this.setData({
     coverstatus:0
   })
  },
  onLoad: function (options) {
    let that=this
    // 选项卡
    let url = app.globalData.api + 'article_types'
    let data = {}
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        that.setData({
          changenav: res.data,
          market1: res.data[0].sub_article_types,
          market2: res.data[1].sub_article_types,
          market3: res.data[2].sub_article_types
        })
        let id = res.data[1].sub_article_types[0].id
        console.log(id)
        that.articlelist(id)
        console.log('1111111111111')
      }, function (err) {
      });
  },

  
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})