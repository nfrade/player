'use strict'
var screenfull = require('screenfull')

exports.on = {
  fullscreen (e) {
    this.fullscreen.origin.set(e.fullscreen)
  }
}

exports.cases = { $playerFullscreen: false }

exports.properties = {
  fullscreen: {
    type: 'instantprop',
    $type: 'boolean',
    render (val) {
      let isNative = this.cases.$native.val
      if (isNative) {
        let videoNode = document.getElementById(this.parent.id)
        if (videoNode) {
          let node = videoNode.parentNode
          let style = node.style
          if (val) {
            document.body.style.marginTop = -node.offsetTop + 'px'
            style.width = '100vh'
            style.height = '100vw'
            style.transform = 'rotate(90deg)'
            style.transformOrigin = '0 0'
            style.marginLeft = '100vw'
          } else {
            document.body.style.marginTop = 0
            style.width = null
            style.height = null
            style.transform = null
            style.transformOrigin = null
            style.marginLeft = null
          }
        }
      } else if (screenfull.enabled) {
        let videoNode = document.getElementById(this.parent.id)
        if (videoNode) {
          let node = videoNode.parentNode
          if (val) {
            screenfull.request(node)
          } else {
            screenfull.exit()
          }
        }
      }
    }
  }
}

exports.fullscreen = ['$', 'cases', '$playerFullscreen']
