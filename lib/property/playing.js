'use strict'
var env = require('vigour-env')
var TIMEUPDATE = 'timeupdate'

exports.inject = [
  require('./shared'),
  function (base, event) {
    var cases = base.cases
    if (cases.$desktop.val) {
      base.set({
        on: {
          click: {
            toggle () {
              this.playing.origin.set(!this.playing.val)
            }
          }
        }
      }, event)
    } else if (env && env.paused) {
      env.paused.on(function (val) {
        if (val === true) {
          cases.$playerPlaying.val = false
        }
      })
    }
  }
]

exports.cases = { $playerPlaying: false }

exports.properties = {
  playing: {
    type: 'instantprop',
    $type: 'boolean',
    render (val) {
      var player = this.parent
      var ready = player.ready.val
      if (val) {
        if (ready) {
          let duration = player.getDuration()
          if (duration) {
            if (typeof duration === 'number' && duration !== Infinity) {
              if (player.ended.val) {
                player.write('progress', 0)
              }
              player.setInterval(TIMEUPDATE, function () {
                if (this.isPlaying()) {
                  if (this.setTime) {
                    this.write('loading', true)
                    if (this.setTime > this.getTime() + 1) {
                      this.seek(this.setTime)
                      this.previousTime -= 1
                      this.setTime = this.previousTime
                    } else {
                      this.setTime = null
                    }
                  } else if (this.ready.val) {
                    this.updateTime()
                  }
                }
              }, 500)
            } else {
              player.setInterval(TIMEUPDATE, function () {
                this.loading.origin.set(!!this.isStalled())
              }, 500)
            }
          } else {
            player.setInterval(TIMEUPDATE, function () {
              if (!this.isStalled()) {
                this.write('loading', false)
                player.clearInterval(TIMEUPDATE)
              } else {
                this.write('loading', true)
              }
            }, 500)
          }
          player.play()
        }
      } else {
        player.write('loading', false)
        player.clearInterval(TIMEUPDATE)
        player.setTime = null
        if (ready) {
          player.pause()
        }
      }
    }
  }
}

exports.playing = ['$', 'cases', '$playerPlaying']
