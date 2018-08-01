// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      price:'',
      discription:'',
      remarks:'',
      id:''
    }
  },
  // 提交
  formSubmit: function () {
    console.log('form发生了submit事件，携带数据为：', this.data.form);
    wx.navigateBack();
  },
  // 执行重置，删除方法
  formReset: function () {
    if(this.data.form.id){
      //删除
      this.del();
    }else{
      //上传后初始化
      this.setData({
        form: {
          price: '',
          discription: '',
          remarks: '',
          id: ''
        }
      })
    }
  },
  //表单双向绑定
  bindKeyInput: function (e) {
    let name = e.currentTarget.id;
    this.data.form[name] = e.detail.value;
    this.setData({
      form: this.data.form
    })
  },
  //删除
  del: function(){
    console.log('删除')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options){return false}
    this.data.form.id = options.id;
    this.setData({
      form: this.data.form
    })
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