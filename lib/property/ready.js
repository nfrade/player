'use strict'
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
          let $progress = data[player.progress.$]
          let $duration = data[player.duration.$]
          let realDuration = player.getDuration()
          let progress = player.progress
          let volume = player.volume
          let playing = player.playing
          let srt = player.srt

          if (realDuration && realDuration > 0) {
            if (!$duration) {
              data.set({ duration: realDuration })
            } else {
              $duration.set(realDuration)
            }
          }
          if (!$progress) {
            data.set({ progress: 0 })
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
        let loading = player.loading
        if (loading) { loading.origin.set(true) }
      }
    }
  }
}

exports.ready = ['$', 'cases', '$playerReady']
