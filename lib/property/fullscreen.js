'use strict'
var screenfull = require('screenfull')
var addedFullscreenEvent = false

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
            let parentNode = node
            while (parentNode) {
              let offsetTop = parentNode.offsetTop || 0
              if (offsetTop) {
                document.body.style.marginTop = -offsetTop + 'px'
                document.body.style.height = window.innerHeight + offsetTop + 'px'
                document.body.className += ' removeOverflow'
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
          } else {
            let className = document.body.className
            document.body.style.marginTop = 0
            document.body.style.height = '100vh'
            document.body.className = className.split(' removeOverflow').join('')
            style.width = null
            style.height = null
            style.transform = null
            style.transformOrigin = null
            style.marginLeft = null
            style.zIndex = 0
          }
        }
      } else if (screenfull.enabled) {
        if (!addedFullscreenEvent){
          document.addEventListener(screenfull.raw.fullscreenchange,
            (ev) => this.parent.cases.set({$playerFullscreen: screenfull.isFullscreen})
          )
          addedFullscreenEvent = true
        }
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
