'use strict'
var cases = require('vigour-element/lib/cases')
var Property = require('./')

// *TODO* dont use playerNoDuration case
cases.setKey('$playerNoDuration', true)
cases.setKey('$playerReady', false)

exports.properties = {
  ready: new Property({
    $type: 'boolean',
    render (val, properties, children, rdata, current, previous) {
      let player = this.parent
      if (val) {
        let realDuration = player.getDuration()
        if (realDuration && realDuration > 0) {
          player.state.data.duration.set(realDuration)
        }
        // *TODO* dont use playerNoDuration case
        var value = !realDuration || realDuration === Infinity
        cases.$playerNoDuration.set(value)
        player.volume.render(player.volume.val)
        player.playing.render(player.playing.val)
        player.time.render(player.state.data.progress.val)
      } else {
        player.loading.origin.set(true)
      }
    }
  })
}

exports.ready = cases.$playerReady
