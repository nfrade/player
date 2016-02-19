'use strict'
// very quick fix!!
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

exports.overlay = {
  // very dirty fix!!
  on: cases.$touch.val && {
    down (e, event) {
      this.controls.opacity._input = 1
      this.controls.opacity.patch(event)
      this.parent.postpone('controls', function () {
        this.overlay.controls.opacity._input = 0
        this.overlay.controls.opacity.patch({stamp: 'fix'})
      }, 1000)
    },
    move (e, event) {
      this.controls.opacity._input = 1
      this.controls.opacity.patch(event)
      this.parent.postpone('controls', function () {
        this.overlay.controls.opacity._input = 0
        this.overlay.controls.opacity.patch({stamp: 'fix'})
      }, 1000)
    }
  },

  loading: {
    type: 'loader',
    display: {
      val: false,
      $playerLoading: true
    }
  },

  interaction: {},

  controls: {
    // opacity: 0,
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
        inject: require('vigour-js/lib/operator/time'),
        $: 'progress',
        $transform (val) {
          var duration = this.parent.state.data.duration
          return val * (duration ? duration.val : 0)
        },
        $time: true
      }
    },
    progress: {
      inject: require('vigour-element/lib/event/drag'),
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
        inject: require('vigour-js/lib/operator/time'),
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
