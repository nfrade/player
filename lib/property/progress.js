'use strict'
var test = /\$vp/

exports.properties = {
  progress: {
    type: 'playerprop',
    $type: 'number',
    render (val, properties, children, rdata, current) {
      var player = this.parent
      if (player.ready.val && (!current || !test.test(current.state.stamp))) {
        var duration = player.duration.val
        var progress = val * duration
        player.setTime = progress
        player.seek(progress)
        player.updateEnded(progress, duration)
        player.previousTime = progress
      }
    }
  }
}

exports.progress = {
  $: 'progress'
}
