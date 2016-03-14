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
        this.setAdData(tracker)
        this.ended.once((e) => {
          if (e === true) {
            this.requestAd(urls, callback)
          }
        }, 'adEnd')
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
    this.cases.$playerAd.set(false)
  },

  setAdData (tracker) {
    var data = new Observable()
    this.state.data = data
    if (this.adData) {
      this.adData.remove()
    }
    this.adData = data
    this.trackAd(data, tracker)
  },

  restoreData (data, stamp) {
    this.state.props.src = stamp
    this.state.data = data
  },

  open (val) {
    if (val) {
      open.open(val, '_blank')
    }
  }
}
