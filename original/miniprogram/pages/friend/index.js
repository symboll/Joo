
const COUNT = 3
// const COUNT = 15

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImageUrls: [
      {
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      }
    ],
    playList: [],
    start: 0
  },

  async _getPlayList (start, count = COUNT) {
    wx.showLoading({
      title: '加载中...',
    })
    try {
      const res = await wx.cloud.callFunction({ 
        name: "music",
        data: { start,  count,  $url: 'playlist' }
      })
      this.setData({
        playList: this.data.playList.concat(res.result.data),
        total: res.result.total
      })
    }catch (err) {
      console.log('err===>', err)
    }finally {
      wx.stopPullDownRefresh()
      wx.hideLoading()
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options==>', options)
    this._getPlayList(this.data.start)
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
    console.log('onPullDownRefresh==>')
    this.setData({
      playList: [],
      start: 0
    })
  
    this._getPlayList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // const length = this.data.playList.length
    // if(length === this.data.total) {
    //   return
    // }
    // this._getPlayList(length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleTap () {
    console.log(123)
  }
})