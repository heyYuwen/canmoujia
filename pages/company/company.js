import modals from '../../class/methods/methods.js'
const request = require('../../class/api/https.js')
const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    changenav:['案例','信用'],
    currentindex:0,
    wrong:[1,2,3],
    index1:0,
    index2:0,
    index3:'a',
    searchcity:'',
    address:'',
    list3: ['武汉', '成都', '上海', '杭州', '重庆', '合肥', '武汉', '成都', '上海', '杭州', '重庆', '合肥'],
    windstatus:0,
    page:1,
    companylist:[],
    area_name:'',   //地区详情
    animation:{},
    imgurl: app.globalData.imgurl,
    pagenum:0,
    reachbottom: 0
  },

  // 装修效果图选项卡
  changenav: function (e) {
    let that=this
    let index = e.currentTarget.dataset.index
    this.setData({
      currentindex: index
    })
    let city = that.data.searchcity
    let area_name = that.data.area_name
    let city_id=that.data.city_id
    // console.log(city_id)
    if (city==''){          //定位
      if (index == 0) {
        that.search_o(area_name, 'case_sort')

      } else if (index == 1) {
        that.search_o(area_name, 'credit_value_sort')
      }
    } else if (typeof (city_id) == 'number'){  //开通
      if (index == 0) {
        that.search_o(city_id, 'case_sort')

      } else if (index == 1) {
        that.search_o(city_id, 'credit_value_sort')
      }
    } else {
      if (index == 0) {
        that.search_o(city, 'case_sort')

      } else if (index == 1) {
        that.search_o(city, 'credit_value_sort')
      }
    }
    
  },
  todetail:function(e){
    let id=e.currentTarget.dataset.item.id
    let url ='/pages/company/store/store?id='
    modals.navigate(url,id)
  },
  onLoad: function (options) { 
    let that = this
    let area_name=''
    qqmapsdk = new QQMapWX({
      key: 'MUFBZ-4QHC4-HI4UD-DPYWB-XOLIQ-N4B4I'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        // console.log('开始', latitude, longitude)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            // console.log(res.result)
            area_name = res.result.address
            let address = res.result.address
            let city = res.result.address_component.city
            let district = res.result.district

            let province = res.result.address_component.province
            that.setData({
              address:city,
              area_name: area_name
            })
            // console.log(address)
            that.search_o(address)
          
          },
          fail: function (res) {
            // console.log(res);
          },
          complete: function (res) {
          }
        });
      }
    })
    
      
  },
  // 查询接口
  search_o:function(city,change){
    var that=this
    var key = city
    // console.log(typeof (key))
    var change = change
    // 1.位置搜索搜索关键 2开通城市搜索
    // 1
    if (typeof (key) == 'string'){
      // console.log(key.length)
      if(key.length>10){
        if (!change) {
          that.setData({
            reachbottom: 1,
            pagenum: 0,
            companylist: []
          })
        } else if (change == 'case_sort') {        //定位-案例排序
          // console.log('2', key, change)
          that.setData({
            reachbottom: 2,
            pagenum: 0,
            companylist: []
          })
        } else if (change == 'credit_value_sort') {   //定位-信用排序
          // console.log('3', key, change)
          that.setData({
            reachbottom: 3,
            pagenum: 0,
            companylist: []
          })
        }
      }else{
        if (!change) {
          that.setData({
            reachbottom: 11,
            pagenum: 0,
            companylist: []
          })
        } else if (change == 'case_sort') {        //搜索-案例排序
          // console.log('22', key, change)
          that.setData({
            reachbottom: 22,
            pagenum: 0,
            companylist: []
          })
        } else if (change == 'credit_value_sort') {   //搜索-信用排序
          // console.log('33', key, change)
          that.setData({
            reachbottom: 33,
            pagenum: 0,
            companylist: []
          })
        }
      }
      } else if (typeof (key)=='number'){        //2    
     if(!change){
       that.setData({
         reachbottom: 4,
         pagenum: 0,
         companylist: []
       })
     } else if (change =='credit_value_sort'){
      //  console.log('5', key, change)
       that.setData({
         reachbottom: 5,
         pagenum: 0,
         companylist: []
       })
     } else if (change == 'case_sort'){
      //  console.log('6', key, change)
       that.setData({
         reachbottom:6,
         pagenum: 0,
         companylist: []
       })
     }
    }
    that.onReachBottom()
  },
  // 关闭选择城市窗口
  closewind:function(){
    // console.log(this.data.animation)
   this.setData({
     windstatus:0,
     animation:{}
   })
  },
  // 选择更多城市
  morecity:function(){
   this.setData({
     windstatus:1
   })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
    })
    this.animation = animation
    animation.left(0).step()
    this.setData({
      animationData: animation.export()
    })
    // console.log(this.data.animationData)
  },
  // 选择热门城市
  selet1:function(e){
    let index=e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.item.name
    let city_id = e.currentTarget.dataset.item.id
    // console.log(city_id)
    let that=this
    that.setData({
      searchcity:name,
      windstatus: 0,
      city_id: city_id,
      index3:index
    })
    that.search_o(city_id)
  },
  // 城市搜索
  tosubmit:function(e){
    let that=this
    let city = e.detail.value.searchcity
    if(city){
      that.setData({
        searchcity:city,
        area_name:city
      })
      that.search_o(city)
    }else{
      modals.showToast('输入城市为空','loading')
    }
  },
  onShow: function () {
    // 拿到开通的城市
    let that=this
    let url2 = app.globalData.api + 'cities'
    let data2 = {}
    request.sendRequest(url2, 'GET', data2, {})
      .then(function (res) {
        // console.log(res.data.data)
        that.setData({
          list3: res.data.data
        })
      }, function (err) {
      });
  },
  // 触底
  onReachBottom: function () {
    // 装修资讯
    let that = this
    let reachbottom=that.data.reachbottom
    let pagenum = that.data.pagenum
    let city_id=that.data.city_id
    pagenum++
    let area_name = that.data.area_name
    let searchcity = that.data.searchcity
    let data
    if (reachbottom == 1) {
      data={
        city_name: area_name,
        per_page: 5,
        page: pagenum
      }
    } else if (reachbottom == 2){
      data = {
        city_name: area_name,
        case_sort: '1',
        per_page: 5,
        page: pagenum
      }
    }else if(reachbottom==3){
      data={
        city_name: area_name,
        credit_value_sort: '1',
        per_page: 5,
        page: pagenum
      }
    }else if(reachbottom==4){
      data={
        city_id: city_id,
        per_page: 5,
        page: pagenum
      }
    }else if(reachbottom==5){
      data={
        city_id: city_id,
        credit_value_sort: '1',
        per_page: 5,
        page: pagenum
      }
    }else if(reachbottom==6){
      data={
        city_id: city_id,
        credit_value_sort: '1',
        per_page: 5,
        page: pagenum
      }
    } else if(reachbottom==11){
       data={
         keyword: area_name,
         per_page: 5,
         page: pagenum
       }
    } else if (reachbottom==22){
      data = {
        keyword: area_name,
        per_page: 5,
        case_sort: '1',
        page: pagenum
      }
    } else if (reachbottom==33){
      data={
        keyword: area_name,
        per_page: 5,
        credit_value_sort: '1',
        page: pagenum
      }
    }
    let url = app.globalData.api + 'companies'
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        let re_data = res.data.data
        let arr=that.data.companylist.concat(re_data)
        console.log(arr)
        that.setData({
          companylist: arr,
          pagenum: pagenum
        })
      }, function (err) {
      });
   
    
  },
  onShareAppMessage: function () {

  }
})