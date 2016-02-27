'use strict'
var isTouch = typeof window === 'undefined'
  ? false
  : (('ontouchstart' in global) ||
    global.DocumentTouch &&
    document instanceof global.DocumentTouch) ||
    navigator.msMaxTouchPoints ||
    false

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

var seek

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
  loading: { type: 'loader' },
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
          seek = this.cases.$phone.val && this.cases.$playerFullscreen.val
            ? rotatedSeek
            : normalSeek
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
    volume: {
      display:{
        val: false,
        $desktop: true
      },
      container: {
        widget: {
          init () {
            var domNode = document.createElement('div')
            domNode.className = 'container'
            var five = 5
            while (five--) {
              let bar = document.createElement('div')
              bar.appendChild(document.createElement('div'))
              domNode.appendChild(bar)
            }
            var vol = this.state.elem.parent.parent.lookUp('volume')
            setVolume(vol.val, domNode)
            return domNode
          },
          update (volume, domNode) {
            if (typeof volume !== 'number') {
              volume = 1 // look for it
            }
            setVolume(volume, domNode)
          }
        }
      },
      on: {
        drag (e) {
          var node = e.currentTarget
          var rect = node.getBoundingClientRect()
          var x = rect.left
          var nr = (e.x - x) / (rect.right - x)
          var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
          var vol = this.parent.lookUp('volume')
          vol.__input = val
          vol.render(val)
          this.container.widget.prototype.update.call(this, val, node.firstChild)
        }
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

if (isTouch) {
  exports.overlay.controls.opacity = 0
  exports.overlay.on = {
    touchstart (e, event) {
      showOverlay.call(this, event)
    },
    touchmove (e, event) {
      showOverlay.call(this, event)
    }
  }
}

function setVolume (volume, domNode) {
  let nodes = domNode.childNodes
  var value = volume * 5
  for (var i = nodes.length - 1; i >= 0; i--) {
    nodes[i].firstChild.className = i < value ? 'active' : 'inactive'
  }
}