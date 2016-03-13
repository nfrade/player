'use strict'
exports.cases = {
  $playerPlaying: {
    on: {
      data: {
        ad (e) {
          if (this.parent.$playerAd.val && this.adTracker) {
            this.adTracker.setPaused(!e)
          }
        }
      }
    }
  },
  $playerReady: {
    on: {
      data: {
        ad (e) {
          if (e && this.parent.$playerAd.val && this.adTracker) {
            this.adTracker.load()
          }
        }
      }
    }
  }
}

exports.define = {
  trackAd (data, tracker) {
    if (tracker) {
      let player = this
      data.setKey(player.progress.$, {
        val: 0,
        on: {
          data (e) {
            var duration = player.duration.val
            var progress = e * duration
            tracker.setProgress(progress)
          }
        }
      })
      this.adTracker = tracker
      tracker.on('clickthrough', () => this.open(tracker.clickThroughURLTemplate))
    }
  }
}
