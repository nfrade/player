'use strict'
var cases = require('vigour-element/lib/cases')
// var InstantProp = require('./').Instant
var TIMEUPDATE = 'timeupdate'

cases.set({
  $playerPlaying: false
})

exports.properties = {
  playing: {
    type: 'instantprop',
    $type: 'boolean',
    render (val) {
      var player = this.parent
      var ready = player.ready.val
      if (val) {
        if (ready) {
          if (player.ended.val) {
            player.state.data.progress.set(0)
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

exports.playing = cases.$playerPlaying
