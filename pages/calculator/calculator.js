import modals from '../../class/methods/methods.js'
const request = require('../../class/api/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    homestyle1: ['1室', '2室', '3室', '4室', '5室'],
    homestyle2: ['1厅', '2厅', '3厅', '4厅','5厅'],
    homestyle3: ['1卫', '2卫', '3卫', '4卫','5卫'],
    homestyle4: ['1厨', '2厨', '3厨', '4厨', '5厨'],
    homestyle5: ['1阳台', '2阳台', '3阳台', '4阳台', '5阳台'],
    shicur:0,
    tingcur:0,
    weicur:0,
    chucur:0,
    taicur:0,
    shi:1,
    ting:1,
    wei:1,
    city:[],
    form_v:'',
    region: ['湖北省', '武汉市', '江汉区'],
    list:[],
    windstatus:false,    //选择室弹窗
    userselect:'1室1厅1卫1厨1阳台'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let url = app.globalData.api + 'albums'
    let data = {
      per_page: 12,
      page: 1
    }
    request.sendRequest(url, 'GET', data, {})
      .then(function (res) {
        console.log(res.data.data)
        let list = res.data.data
        let arr=[]
        arr=list.slice(5,8)
        that.setData({
          list: arr
        })
      }, function (err) {
      });
  },
  // 城市选择
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    
  },
  // 选择室
  selectareas:function(){
    this.setData({
      selectareastatus: 1,
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
  // 选择弹框
  selectfunction:function(){
    let that=this
     that.setData({
       windstatus:true
     })
  },
  // 选择shi
  selectshi:function(e){
   let index=e.currentTarget.dataset.item
   this.setData({
     shicur:index
   })
  },
  // 选择厅
  selectting:function(e){
    let index = e.currentTarget.dataset.item
    this.setData({
      tingcur: index
    })
  },
  // 选择卫
  selectwei:function(e){
    let index = e.currentTarget.dataset.item
    this.setData({
      weicur: index
    })
  },
  // 选择厨
  selectchu: function (e) {
    let index = e.currentTarget.dataset.item
    this.setData({
      chucur: index
    })
  },
  // 选择阳台
  selecttai: function (e) {
    let index = e.currentTarget.dataset.item
    this.setData({
      taicur: index
    })
  },
  // 确认
  makesure: function () {
    let shi=this.data.shicur+1;
    let ting=this.data.tingcur+1;
    let wei=this.data.weicur+1;
    let chu=this.data.chucur+1;
    let tai=this.data.taicur+1
    let userselect=shi+'室'+ting+'厅'+wei+'卫'+chu+'厨'+tai+'阳台';
    console.log(userselect)
    this.setData({
      windstatus: false,
      userselect: userselect
    })
  },
  // 表单提交
  tosubmit:function(e){
    let that=this
    console.log(e.detail.value)
    let name = e.detail.value.username;
    let phone =e.detail.value.phone;
    let housemj = e.detail.value.housemj;
    let shi=that.data.shi;
    let ting=that.data.ting;
    let wei=that.data.wei;
    // let city = that.data.multiArray[]
    if (name == '') {
      modals.showToast('您的姓名为空', 'loading')
    }else if(phone==''){
      modals.showToast('您的手机号为空', 'loading')
    }else if(housemj==''){
      modals.showToast('请填写房间面积', 'loading')
    } else if (phone.length<11){
      modals.showToast('手机号有误', 'loading')
    }else{
      if ((/^1[34578]\d{9}$/.test(phone))) {
        let arr = that.data.shi + '室'+ that.data.ting + '厅'+ that.data.wei + '卫'
        let addr_detail = that.data.region[0] + that.data.region[1]+that.data.region[2]
        let url = app.globalData.api + 'tenders'
        let data = {
          name:name,
          mobile: phone,
          addr_detail: addr_detail,
          floor_space: housemj,
          service_need:'free_offer',
          room_type:arr,
        }                  
        request.sendRequest(url, 'post', data, {})
          .then(function (res) {
            console.log(res.data)
            modals.showToast('提交成功', 'success')
            setTimeout(function(){
              that.setData({
                form_v: ''
              })
            },1000)
           
          }, function (err) {
          });
        
      }
    }
  },
  aboutus:function(){
    let url = '/pages/company/storemesg/storemesg'
    modals.navigate(url)
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