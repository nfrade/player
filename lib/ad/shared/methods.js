'use strict'
var Observable

exports.inject = function (base, event) {
  Observable = base.components.observable.Constructor
  base.define({ renderSrc: base.src.render })
}

exports.define = {
  playAdRoll (adStore, adRoll, data, originalStamp) {
    var urls = []
    var callback = (adsrc, tracker) => {
      if (adsrc) {
        this.setAdData(tracker)
        this.ended.on((e) => {
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
    this.renderSrc.call(this.src, this.src.val)
    data[this.progress.$].on((e, event) => {
      let current
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
    this.cases.$playerAd.set(false)
  },

  setAdData (tracker) {
    let data = new Observable()
    this.state.data = data
    this.__input = data
    if (tracker) {
      let player = this
      data.setKey('progress', {
        val: 0,
        on: {
          data (e) {
            tracker.setProgress(e * player.duration.val)
          }
        }
      })
    }
  },

  restoreData (data, stamp) {
    this.state.props.src = stamp
    this.state.data = data
    this.__input = data
  }
}
