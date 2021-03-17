// const QR = require('../../utils/wxqrcode');
// Page({

//   data: {
//     // qrcode
//     text: 'http://',
//     qrcode: '',
//      url:"sljaflsdjfl",
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var that = this;
//     let qrcodeSize = that.getQRCodeSize()
//     that.createQRCode(that.data.text, qrcodeSize)
//   },
//   //适配不同屏幕大小的canvas
//   getQRCodeSize: function () {
//     var size = 0;
//     try {
//       var res = wx.getSystemInfoSync();
//       var scale = res.windowWidth / 750; //不同屏幕下QRcode的适配比例；设计稿是750宽
//       var width = 300 * scale;
//       size = width;
//     } catch (e) {
//       // Do something when catch error
//       console.log("获取设备信息失败" + e);
//       size = 150;
//     }
//     return size;
//   },
//   createQRCode: function (text, size) {
//     //调用插件中的draw方法，绘制二维码图片
   

//     let that = this
//     try {
//       //  console.log('QRcode: ', text, size)
//       let _img = QR.createQrCodeImg(text, {
//         size: parseInt(size)
//       })

//       that.setData({
//         'qrcode': _img
//       })
//     } catch (e) {
//       console.warn(e)
//     }
//     this.canvasToTempImage();
//   },
// //获取临时缓存照片路径，存入data中
// canvasToTempImage: function () {
//   var that = this;
//   wx.canvasToTempFilePath({
//     canvasId: 'mycanvas',
//     success: function (res) {
//       var tempFilePath = res.tempFilePath;
//       console.log(tempFilePath);
//       that.setData({
//         imagePath: tempFilePath,
//         // canvasHidden:true
//       });
//     },
//     fail: function (res) {
//       console.log(res);
//     }
//   });
// },
  
 
//   bind_sumbit(e) {
//     this.onLoad();
//   },


//    // 长按保存功能--授权部分
// saveImage(e) {
//   let _this = this
//   wx.showActionSheet({
//       itemList: ['保存到相册'],
//       success(res) {
//           let url = e.target.dataset.url;
//           console.log(e.target.dataset.url);
//           wx.getSetting({
//               success: (res) => {
//                   if (!res.authSetting['scope.writePhotosAlbum']) {
//                       wx.authorize({
//                           scope: 'scope.writePhotosAlbum',
//                           success: () => {
//                               // 同意授权
//                               _this.saveImgInner(url);
//                           },
//                           fail: (res) => {
//                               console.log(res);
//                               wx.showModal({
//                                   title: '保存失败',
//                                   content: '请开启访问手机相册权限',
//                                   success(res) {
//                                       wx.openSetting()
//                                   }
//                               })
//                           }
//                       })
//                   } else {
//                       // 已经授权了
//                       _this.saveImgInner(url);
//                   }
//               },
//               fail: (res) => {
//                 console.log(url);
//                   console.log(res);
//               }
//           })   
//       },
//       fail(res) {
//         console.log(url);

//           console.log(res.errMsg)
//       }
//   })
// },
// // 长按保存功能--保存部分
// saveImgInner (url) {
//   console.log()
//   wx.getImageInfo({
//       src: url,
//       success: (res) => {
//         console.log(res.path)
//           let path = res.path;
//           wx.saveImageToPhotosAlbum({
//               filePath: path,
//               success: (res) => {
//                   console.log(res);
//                   wx.showToast({
//                       title: '已保存到相册',
//                   })
//               },
//               fail: (res) => {
//                   console.log(res);
//               }
//           })
//       },
//       fail: (res) => {
//           console.log(res);
//       }
//   })
// },
// });

var QR = require("../../utils/qrcode.js");

Page({

  data: {
    name:"lishi",
    canvasHidden: false,
    imagePath: '',
    placeholder: 'https://www.xxxxx.com/xxxxx/index.html?name=lishi',//默认二维码生成文本
    text: 'this is test',
  },
  bind_sumbit(e) {
         this.onLoad();
       },
       bind_text(e) {
        let text = e.detail.value;
        this.setData({
          text: text
        });
      },

      // onLoad: function (options) {
      //       var that = this;
      //       let qrcodeSize = that.getQRCodeSize()
      //       that.createQRCode(that.data.text, qrcodeSize)
      //     },
          // //适配不同屏幕大小的canvas
          // getQRCodeSize: function () {
          //   var size = 0;
          //   try {
          //     var res = wx.getSystemInfoSync();
          //     var scale = res.windowWidth / 750; //不同屏幕下QRcode的适配比例；设计稿是750宽
          //     var width = 300 * scale;
          //     size = width;
          //   } catch (e) {
          //     // Do something when catch error
          //     console.log("获取设备信息失败" + e);
          //     size = 150;
          //   }
          //   return size;
          // },
  //动态生成二维码
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.text;
    console.log(initUrl)
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      console.log(res.windowWidth);
      var scale = res.windowWidth / 650; //不同屏幕下QRcode的适配比例；设计稿是750宽
       var width = 300 * scale;
       var height = width;
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (text, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(text, canvasId, cavW, cavH);
    console.log(text)
    setTimeout(() => { this.canvasToTempImage(); }, 1000);
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

  // 下载二维码

    downloadCode: function (res) {
       var filePath = this.data.imagePath
       console.log('下载中' + filePath)
       wx.saveImageToPhotosAlbum({
         filePath: filePath,
         success: function(res) {
           wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000 //持续的时间
           })
         },
         fail: function (err) {
            console.log(err)
            wx.showToast({
            title: '图片保存失败',
            icon: 'none',
            duration: 2000//持续的时间
         })
       }
    })
   }


})