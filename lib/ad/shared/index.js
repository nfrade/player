'use strict'
exports.inject = require('./method')

exports.cases = {
  $playerAd: false
}

exports.src = {
  render (val) {
    if (val) {
      let player = this.parent
      let ads = player.config.ads

      if (!ads) {
        player.renderSrc.call(this, val)
        return
      }

      let state = player.state
      let data = state.data
      let stamp = state.props.src
      let progress = player.progress.val
      let adStore = {}
      let preroll

      if (typeof progress !== 'number') {
        progress = 0
      }

      ads.each((prop, i) => {
        if (i / 100 <= progress) {
          adStore[i] = false
          preroll = prop
        } else {
          adStore[i] = true
        }
      })

      if (preroll) {
        player.playAdRoll(adStore, preroll, data, stamp)
      } else {
        player.playVideo(adStore, data, stamp)
      }
    }
  }
}

exports.on = {
  click () {
    if (this.cases.$playerAd.val && this.adTracker) {
      // this.adTracker.emit('clickthrough')
    }
  }
}
