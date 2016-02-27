'use strict'
var ERROR = 'Missing data: '
var requiredData = [
  'progress',
  'duration',
  'video'
]

exports.cases = {
  $playerReady: false
}

exports.properties = {
  ready: {
    type: 'playerprop',
    $type: 'boolean',
    render (val, properties, children, rdata, current, previous) {
      let player = this.parent
      if (val) {
        let data = player.state.data
        if (!verifyData(data)) {
          player.playing.origin.set(false)
          player.ready.origin.set(false)
          return
        }

        let realDuration = player.getDuration()
        if (realDuration && realDuration > 0) {
          data.duration.set(realDuration)
        }

        player.volume.render(player.volume.val)
        player.playing.render(player.playing.val)
        player.time.render(player.state.data.progress.val)
      } else {
        player.loading.origin.set(true)
      }
    }
  }
}

exports.ready = ['$', 'cases', '$playerReady']

function verifyData (data) {
  var missingfield
  for (var i = requiredData.length - 1; i >= 0; i--) {
    let key = requiredData[i]
    if (!data[key]) {
      missingfield = true
      console.error(ERROR + key)
    }
  }
  if (!missingfield) {
    return true
  }
}
