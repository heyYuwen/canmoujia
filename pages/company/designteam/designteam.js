import modals from '../../../class/methods/methods.js'
const request = require('../../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
   nav:['案例总数','个人简介'],
    current:0,
    image: ['/images/company/1.jpg', '/images/company/2.jpg', '/images/company/3.jpg', '/images/company/4.jpg'],
    userinfo:'',
    album:''
  },

  changenav:function(e){
   let index=e.currentTarget.dataset.index
   this.setData({
     current:index
   })
  },
  onLoad: function (options) {
    console.log(options.userid)
    let that=this
    let url = app.globalData.api + 'designers/' + options.userid
    let data = {
      // id: options.userid
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        let album = res.data.album
        let arr=[]
        that.setData({
          userinfo: res.data
        })
        for (let i = 0; i < album.length; i++) {
          let list = []
          let str
          for (var j = 0; j < album[i].prop_value.length; j++) {
            list.push(album[i].prop_value[j].name)
          } 
          str=list.join('')
          album[i]['title']=str //对象添加属性
        }
        console.log(album)
        that.setData({
          album: album
        })
      }, function (err) {
      });
  },

 
})