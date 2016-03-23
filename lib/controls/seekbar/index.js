'use strict'
require('./style.less')

var ua = require('vigour-ua/navigator')

exports.seekbar = {
  inject (base) {
    base.define({
      scrub: ua.webview
      ? function (e) {
        var data = this.seek.bar.state.data
        var rect = e.currentTarget.getBoundingClientRect()
        var x = rect.left
        var n = (e.x - x) / (rect.right - x)
        if (data.progress) {
          data.progress.origin.val = n > 1 ? 1 : n < 0 ? 0 : n
        }
      }
      : function (e) {
        var data = this.seek.bar.state.data
        var fullscreen = this.lookUp('fullscreen')
        var rect = e.currentTarget.getBoundingClientRect()
        var n
        if (fullscreen && fullscreen.val) {
          n = (e.y - rect.top) / rect.height
        } else {
          let x = rect.left
          n = (e.x - x) / (rect.right - x)
        }
        if (data.progress) {
          data.progress.origin.val = n > 1 ? 1 : n < 0 ? 0 : n
        }
      }
    })
  },
  seek: {
    bar: {
      w: {
        forceUpdates: true,
        $: 'progress',
        $transform (val) {
          return (val || 0) * 100 + '%'
        }
      },
      button: {}
    }
  },
  on: {
    down (e) {
      this.scrub(e)
    },
    drag (e) {
      this.scrub(e)
    }
  }
}
