'use strict'
var open = require('vigour-open')
var Observable

exports.inject = [
  require('./tracker'),
  function (base, event) {
    Observable = base.components.observable.Constructor
    base.define({ renderSrc: base.src.render })
  }
]

exports.define = {
  playAdRoll (adStore, adRoll, data, originalStamp) {
    var urls = []
    var callback = (adsrc, tracker) => {
      if (adsrc) {
        let player = this
        let data = this.setAdData(tracker, urls)
        data.setKey(player.progress.$, {
          val: 0,
          on: {
            data: {
              startNext (e, event) {
                var duration = player.duration.val
                var progress = e * duration
                var ended = progress >= duration - 0.5
                // **TODO** remove this fishy hack to update the progress bar
                var controls = player.controls
                if (controls) {
                  controls.seekbar.seek.bar.w.emit('data', event)
                }
                if (ended) {
                  player.requestAd(urls, callback)
                }
              }
            }
          }
        })
        this.cases.$playerAd.set(true)
        this.renderSrc.call(this.src, adsrc)
      } else {
        this.restoreData(data, originalStamp)
        this.playVideo(adStore, data, originalStamp)
      }
    }
    adRoll.each((prop, i) => urls.push(prop.val))
    this.requestAd(urls, callback)
  },

  playVideo (adStore, data, originalStamp) {
    var $playerAd = this.cases.$playerAd
    data.get(this.progress.$.slice(), {}).on((e, event) => {
      var current
      for (let i in adStore) {
        if (e >= i / 100) {
          current = adStore[i] && i
        }
      }
      if (current) {
        let adRoll = this.config.ads[current]
        adStore[current] = false
        this.playAdRoll(adStore, adRoll, data, originalStamp)
      }
    }, 'adProgress')
    this.renderSrc.call(this.src, this.src.val)
    $playerAd.set(false)
  },

  setAdData (tracker, urls) {
    var data = new Observable()
    this.state.data = data
    this.__input = data
    this.emit('data')
    if (this.adData) {
      this.adData.remove()
    }
    this.adData = data
    this.trackAd(data, tracker)
    return data
  },

  restoreData (data, stamp) {
    this.state.props.src = stamp
    this.state.data = data
    this.__input = data
    this.emit('data')
  },

  open (val) {
    if (val) {
      open.open(val, '_blank')
    }
  }
}
