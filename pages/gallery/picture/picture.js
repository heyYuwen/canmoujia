import modals from '../../../class/methods/methods.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    banner: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.photos))
    this.setData({
      banner: JSON.parse(options.photos)
    })
  },
  btn:function(){
    let url ='/pages/company/freedesign/freedesign'
      modals.navigate(url)
  },
  wxParseImgTap:function(e) {
    var that = this;
    // console.log(e)
    var nowImgUrl = e.target.dataset.url;
    var index = e.target.dataset.index;
    let src = that.data.imgurl
    let banner=that.data.banner
    console.log(banner[index].image)
    let urls =[]
     let aa=src + banner[index].image
     urls.push(aa)
    console.log(urls)
    wx.previewImage({
      current: src+nowImgUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
     })
 
},
  aaa:function(e){
    // console.log(e)
    var that = this;
    var nowImgUrl = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    let src = that.data.imgurl
    let urls = []
    let aa = src + that.data.banner[index].image
    urls.push(aa)
    console.log(urls)
    wx.previewImage({
      current: src + nowImgUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  
})