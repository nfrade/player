'use strict'
var cases = require('vigour-element/lib/cases')

var normalSeek = function normalSeek (e) {
  var rect = e.currentTarget.getBoundingClientRect()
  var x = rect.left
  var nr = (e.x - x) / (rect.right - x)
  var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
  this.seek.bar.state.data.progress.origin.val = val
}
var rotatedSeek = function rotatedSeek (e) {
  var rect = e.currentTarget.getBoundingClientRect()
  var x = rect.top
  var nr = (e.y - x) / rect.height
  var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
  this.seek.bar.state.data.progress.origin.val = val
}

var seek = normalSeek
cases.$playerFullscreen.on(function () {
  seek = this.val ? rotatedSeek : normalSeek
})

var showOverlay = function showOverlay (event) {
  this.controls.opacity.__input = 1
  this.controls.opacity.patch(event)
  this.parent.postpone('controls', function () {
    this.overlay.controls.opacity.__input = 0
    this.overlay.controls.opacity.patch({stamp: 'fix'})
  }, 1000)
}

exports.overlay = {
  order: 1,

  loading: {
    type: 'loader'
  },

  interaction: {},

  controls: {
    play: {
      type: 'icon',
      css: {
        val: 'play-o',
        $playerPlaying: 'pause-o',
        $prepend: 'icon-'
      },
      on: {
        click () {
          this.parent.parent.parent.toggle()
        }
      }
    },
    time: {
      text: {
        $: 'progress',
        $transform (val) {
          var duration = this.parent.state.data.duration
          return val * (duration ? duration.val : 0)
        },
        $time: true
      }
    },
    progress: {
      on: {
        down (e) {
          seek.call(this, e)
        },
        drag (e) {
          seek.call(this, e)
        }
      },
      seek: {
        bar: {
          w: {
            $: 'progress',
            $transform (val) {
              return val * 100 + '%'
            }
          },
          button: {}
        }
      }
    },
    duration: {
      text: {
        $: 'duration',
        $time: true
      }
    },
    exit: {
      type: 'icon',
      css: {
        val: 'fullscreen',
        $playerFullscreen: 'fullscreen-exit',
        $prepend: 'icon-'
      },
      on: {
        click () {
          var fs = this.lookUp('fullscreen')
          fs.origin.val = !fs.val
        }
      }
    }
  }
}

if (cases.$touch.val) {
  exports.opacity = 1
  exports.overlay.on = {
    touchstart (e, event) {
      showOverlay.call(this, event)
    },
    touchmove (e, event) {
      showOverlay.call(this, event)
    }
  }
}
