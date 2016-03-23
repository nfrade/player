'use strict'
exports.inject = require('./shared')

exports.cases = {
  $playerReady: false
}

exports.properties = {
  ready: {
    type: 'playerprop',
    $type: 'boolean',
    render (val) {
      let player = this.parent
      if (val) {
        let data = player.state.data
        if (data) {
          let realDuration = player.getDuration()
          let progress = player.progress
          let playing = player.playing
          let volume = player.volume
          let srt = player.srt
          if (realDuration && realDuration > 0) {
            player.write('duration', realDuration)
          }
          if (progress) { progress.render(progress.val) }
          if (volume) { volume.render(volume.val) }
          if (playing) { playing.render(playing.val) }
          if (srt) { srt.render(srt.val) }
        } else {
          console.error('player error:no data')
        }
      } else {
        player.clearInterval()
        player.write('loading', true)
      }
    }
  }
}

exports.ready = ['$', 'cases', '$playerReady']
