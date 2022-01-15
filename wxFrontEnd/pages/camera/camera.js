// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.ctx = wx.createCameraContext()
    
  },
  choosePhoto: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: ret => {
        var filePath = ret.tempFilePaths[0]
        that.setData({
          modelData: {
            src1: filePath
          }
        })
        console.log(filePath)
        wx.request({
          url: 'http://127.0.0.1:8888/login', 
          method: 'POST',      
          data: {  
            filepath: filePath,
            token: 'pcLXbWEOLvZRW8oQKcFDKtozCoqEkGRJ'
          }, 
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success (res) {
            console.log(res.data)
          }
        })
      },   
    })
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },

  error(e) {
    console.log(e.detail)
  }
})