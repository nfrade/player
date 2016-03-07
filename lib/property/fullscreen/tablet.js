'use strict'
var ua = require('vigour-ua/navigator')
var ANDROID = ua.platform === 'android'

module.exports = function (val) {
  let videoNode = document.getElementById(this.parent.id)
  let htmlStyle = document.documentElement.style
  if (videoNode) {
    let node = videoNode.parentNode
    let style = node.style
    if (val) {
      let parentNode = node
      while (parentNode) {
        let offsetTop = parentNode.offsetTop || 0
        if (offsetTop) {
          document.body.style.marginTop = -offsetTop + 'px'
          document.body.style.height = window.innerHeight + offsetTop + 'px'
          break
        }
        parentNode = parentNode.parentNode
      }
      style.width = '100vw'
      style.height = '100vh'
      style.zIndex = 999999
      if (ANDROID) {
        htmlStyle.overflow = 'visible'
        htmlStyle.height = '100vh'
      }
    } else {
      document.body.style.marginTop = 0
      document.body.style.height = null
      style.width = null
      style.height = null
      style.zIndex = 0
      if (ANDROID) {
        htmlStyle.overflow = null
        htmlStyle.height = null
      }
    }
  }
}
