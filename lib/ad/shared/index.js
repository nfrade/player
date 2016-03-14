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

      if (typeof progress !== 'number') {
        progress = 0
      }

      ads.each((prop, i) => {
        adStore[i] = true
      })

      let current
      for (let i in adStore) {
        if (progress >= i / 100) {
          current = adStore[i] && i
        }
      }

      if (current !== void 0) {
        let preroll = ads[current]
        adStore[current] = false
        player.playAdRoll(adStore, preroll, data, stamp)
      } else {
        player.playVideo(adStore, data, stamp)
      }
    }
  }
}

exports.on = {
  click: {
    clickthrough () {
      var cases = this.cases
      var $playerInteraction = cases.$playerInteraction
      if ($playerInteraction && !$playerInteraction.val) {
        if (cases.$playerPlaying.val) {
          return
        }
      }
      if (cases.$playerAd.val && this.adTracker) {
        this.adTracker.emit('clickthrough')
        return false
      }
    }
  }
}
