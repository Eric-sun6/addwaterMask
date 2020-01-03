/* eslint-disable no-unused-vars */
module.exports = {
  //   入参说明：
  //   srcImgBase64要加水印的图片对象
  //   exportImgWidth：导出的图片宽
  //   exportImgHeight：导出的图片高
  //   waterMasterText：水印内容
  //   lineHeight:字行高
  //   调用该函数，返回一个base64码的图片数据
  addWaterMask: function ({
    srcImgBase64,
    exportImgWidth,
    exportImgHeight,
    waterMasterText1,
    waterMasterText2,
    lineHeight }
  ) {
    let img = new Image()
    img.src = srcImgBase64
    let that = this
    return new Promise((resolve, reject) => {
      img.onerror = (e) => {
        alert('加水印异常')
        reject(e)
      }
      img.onload = function () {
        let canvas = document.createElement('canvas')
        let canvasContent = canvas.getContext('2d')
        canvas.display = 'inline-block'
        canvas.width = exportImgWidth
        canvas.height = exportImgHeight
        canvasContent.drawImage(img, 0, 0, exportImgWidth, exportImgHeight)
        canvasContent.font = '13px 微软雅黑'
        canvasContent.fillStyle = 'rgba(252,0,0,1)'
        canvasContent.textBaseline = 'middle'
        that.canvasTextAutoLine(waterMasterText1, canvas, 15, 'left', 'top', lineHeight)
        that.canvasTextAutoLine(waterMasterText2, canvas, 15, 'right', 'bottom', lineHeight)
        let src = canvas.toDataURL('image/jpeg', 0.92)// 默认设置0.92压缩
        // eslint-disable-next-line one-var
        let rio = 10, exportPhoto = '', maxSize = 100
        let photoLength = parseInt(canvas.toDataURL('image/jpeg', 0.92).length / 1024)
        for (var i = 0; i <= 10; i++) {
          if (photoLength < maxSize) {
            resolve(src)
            return
          }// 图片大小小于maxSize直接返回，不压缩
          photoLength = parseInt(canvas.toDataURL('image/jpeg', rio / 10).length / 1024)
          if (rio > 0) { // 压缩比率大于0
            rio--
            photoLength = parseInt(canvas.toDataURL('image/jpeg', rio / 10).length / 1024)
            if (photoLength < maxSize) {
              exportPhoto = canvas.toDataURL('image/jpeg', rio / 10)
              let exportLength = photoLength
              console.log(exportLength)
            }
          }
        }
        resolve(exportPhoto)
      }
    })
  },
  /*
    str:要绘制的字符串
    canvas:canvas对象
    horizontal:绘制字符串x方向排布
    vertical:绘制字符串y方向排布
    文字总长度不超过canvas宽度的5/8
    */
  canvasTextAutoLine: function (str, canvas, margin, horizontal, vertical, lineHeight) {
    let ctx = canvas.getContext('2d')
    let lineWidth = 0
    let canvasWidth = canvas.width
    let canvasHeight = canvas.height
    let lastSubStrIndex = 0
    // 计算绘制水印的位置
    let positionX, positionY
    // 水平方向
    switch (horizontal) {
      case 'left':
        positionX = margin
        break
      case 'right':
        positionX = canvasWidth - (canvasWidth / 8 * 5) - 10
        break
      case 'center':
        positionX = canvasWidth - (canvasWidth / 8 * 5) / 2
    }
    // 垂直方向
    switch (vertical) {
      case 'top':
        positionY = margin
        break
      case 'bottom':
        positionY = canvasHeight - lineHeight - (2 * margin)
        break
      case 'middle':
        positionY = (canvasHeight - lineHeight) / 2
    }
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width
      if (lineWidth > canvasWidth / 8 * 5) {
        ctx.fillText(str.substring(lastSubStrIndex, i), positionX, positionY)
        positionY += lineHeight
        lineWidth = 0
        lastSubStrIndex = i
      }
      // eslint-disable-next-line eqeqeq
      if (i == str.length - 1) {
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), positionX, positionY)
      }
    }
  },
  // 输出base64文件大小,入参为base64文件流,返回kb
  exportPhotoFileSize (str, unit) {
    let strLength = str.length
    let fileLength = parseInt(strLength - (strLength / 8) * 2)
    // 由字节转换为KB
    let size = ''
    // eslint-disable-next-line no-return-assign
    return size = (strLength / 1024).toFixed(2) + 'kb' + '\n'
  }
}
