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
      style.width = '100vh'
      style.height = '100vw'
      style.transform = 'rotate(90deg)'
      style.transformOrigin = '0 0'
      style.marginLeft = '100vw'
      style.zIndex = 999999
      if (ANDROID) {
        htmlStyle.overflow = 'visible'
        htmlStyle.height = '100vh'
      }
    } else {
      document.body.style.marginTop = 0
      document.body.style.height = '100vh'
      style.width = null
      style.height = null
      style.transform = null
      style.transformOrigin = null
      style.marginLeft = null
      style.zIndex = 0
      if (ANDROID) {
        htmlStyle.overflow = null
        htmlStyle.height = null
      }
    }
  }
}
