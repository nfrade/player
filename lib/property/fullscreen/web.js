'use strict'
var screenfull = require('screenfull')
var addedFullscreenEvent = false

module.exports = function (val) {
  if (screenfull.enabled) {
    if (!addedFullscreenEvent) {
      document.addEventListener(screenfull.raw.fullscreenchange,
        (e) => this.parent.write('fullscreen', screenfull.isFullscreen)
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
