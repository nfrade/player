'use strict'
var TIMEUPDATE = 'timeupdate'

exports.inject = require('./shared')

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
                player.state.data[player.progress.$].set(0)
              }
              player.setInterval(TIMEUPDATE, function () {
                if (!this.isPlaying()) {
                  // this.playing.origin.set(false)
                } else if (this.setTime) {
                  this.loading.origin.set(true)
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
              }, 500)
            } else {
              player.setInterval(TIMEUPDATE, function () {
                this.loading.origin.set(!!this.isStalled())
              }, 500)
            }
          } else {
            player.setInterval(TIMEUPDATE, function () {
              if (!this.isStalled()) {
                this.loading.origin.set(false)
                player.clearInterval(TIMEUPDATE)
              } else {
                this.loading.origin.set(true)
              }
            }, 500)
          }
          player.play()
        }
      } else {
        player.loading.origin.set(false)
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
