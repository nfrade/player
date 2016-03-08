'use strict'
require('./style.less')

var isChannel = require('../util/is/channel')
var seek

function normalSeek (e) {
  var rect = e.currentTarget.getBoundingClientRect()
  var x = rect.left
  var nr = (e.x - x) / (rect.right - x)
  var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
  this.seek.bar.state.data.progress.origin.val = val
}

function rotatedSeek (e) {
  var rect = e.currentTarget.getBoundingClientRect()
  var x = rect.top
  var nr = (e.y - x) / rect.height
  var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
  this.seek.bar.state.data.progress.origin.val = val
}

function showOverlay (event) {
  this.cursor.__input = 'auto'
  this.cursor.patch(event)
  this.controls.opacity.__input = 1
  this.controls.opacity.patch(event)
  this.parent.postpone('controls', function () {
    let e = {stamp: 'fix'}
    this.overlay.cursor.__input = 'none'
    this.overlay.cursor.patch(e)
    this.overlay.controls.opacity.__input = 0
    this.overlay.controls.opacity.patch(e)
  }, 2000)
}

function roadblock (player) {
  if (player.locked && player.locked.val) {
    let rootdata = player.state.data.getRoot()
    let modal = rootdata.state.modal
    if (modal) {
      modal.set({
        current: rootdata.get('modals.roadblock', {})
      })
    }
  }
}

exports.overlay = {
  order: 1,
  loading: { type: 'loader' },
  cursor: {
    type: 'style',
    render (val, properties) {
      properties.style.cursor = val
    }
  },
  css: {
    $: 'video',
    $transform (val) {
      if (isChannel(this)) {
        return 'channel-overlay'
      }
      return ''
    }
  },
  on: {
    click () {
      if (!exports.block) {
        roadblock(this.parent)
      }
    }
  },
  interaction: {
    $playerAd: {
      on: {
        click () {
          var player = this.parent.parent
          player.open(player.cases.$clickthroughUrl.val)
        }
      }
    },
    on: {
      click () {
        if (!exports.block) {
          let player = this.parent.parent
          roadblock(player)
          player.toggle()
        }
      },
      dblclick () {
        if (!exports.block) {
          let fs = this.lookUp('fullscreen')
          fs.origin.val = !fs.val
        }
      }
    }
  },
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
          if (!exports.block) {
            let player = this.parent.parent.parent
            player.toggle()
          }
        }
      }
    },
    time: {
      text: {
        $: 'progress',
        $transform (val) {
          var data = this.parent.state.data
          var duration = data && data.duration
          return val * (duration ? duration.val : 0)
        },
        $time: true
      }
    },
    progress: {
      on: {
        // TODO clean this up
        down (e) {
          if (!exports.block) {
            let cases = this.cases
            seek = (cases.$touch.val && cases.$playerFullscreen.val)
              ? rotatedSeek
              : normalSeek
            seek.call(this, e)
          } else {
            seek = false
          }
        },
        drag (e) {
          if (!exports.block) {
            if (seek) {
              seek.call(this, e)
            } else {
              let cases = this.cases
              seek = (cases.$touch.val && cases.$playerFullscreen.val)
                ? rotatedSeek
                : normalSeek
              seek.call(this, e)
            }
          }
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
      display: {
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
        click (e) {
          if (!exports.block) {
            let fs = this.lookUp('fullscreen')
            fs.origin.val = !fs.val
          }
        }
      }
    }
  }
}

exports.overlay.controls.opacity = 0
exports.overlay.on.touchstart = function (e, event) {
  if (this.controls.opacity.__input === 0 && this.cases.$playerPlaying.val) {
    exports.block = true
  } else {
    exports.block = false
  }
  showOverlay.call(this, event)
}
exports.overlay.on.move = function (e, event) {
  if (this.controls.opacity.__input === 0) {
    exports.block = true
  } else {
    exports.block = false
  }
  showOverlay.call(this, event)
}

function setVolume (volume, domNode) {
  let nodes = domNode.childNodes
  var value = volume * 5
  for (var i = nodes.length - 1; i >= 0; i--) {
    nodes[i].firstChild.className = i < value ? 'active' : 'inactive'
  }
}
