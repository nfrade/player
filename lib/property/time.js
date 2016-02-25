'use strict'
// var Property = require('./')
var test = /\$vp/

exports.properties = {
  time: {
    type: 'playerprop',
    $type: 'number',
    render (val, properties, children, rdata, current) {
      var player = this.parent
      if (player.ready.val && (!current || !test.test(current.state.stamp))) {
        var duration = player.state.data.duration.val
        var time = val * duration
        player.setTime = time
        player.seek(time)
        player.updateEnded(time, duration)
        player.previousTime = time
      }
    }
  }
}

exports.time = {
  $: 'progress'
}
