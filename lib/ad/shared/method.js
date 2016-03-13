'use strict'
var open = require('vigour-open')
var define = exports.define = {}
var Observable

exports.inject = function (base, event) {
  Observable = base.components.observable.Constructor
  base.define({ renderSrc: base.src.render })
}

define.playAdRoll = function (adStore, adRoll, data, originalStamp) {
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
}

define.playVideo = function (adStore, data, originalStamp) {
  data.get(this.progress.$.slice(), {}).on((e, event) => {
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
  this.renderSrc.call(this.src, this.src.val)
  this.cases.$playerAd.set(false)
}

define.setAdData = function (adTracker) {
  let data = new Observable()
  this.state.data = data
  this.__input = data
  if (adTracker) {
    let player = this
    data.setKey(player.progress.$, {
      val: 0,
      on: {
        data (e) {
          adTracker.setProgress(e * player.duration.val)
        }
      }
    })
    this.adTracker = adTracker
    adTracker.on('clickthrough', () => this.open(adTracker.clickThroughURLTemplate))
    // player.on('canplay', function() {adTracker.load();});
    // player.on('timeupdate', function() {adTracker.setProgress(this.currentTime);});
    // player.on('play', function() {adTracker.setPaused(false);});
    // player.on('pause', function() {adTracker.setPaused(true);});
  }
}

define.restoreData = function (data, stamp) {
  this.state.props.src = stamp
  this.state.data = data
  this.__input = data
}

define.open = function (val) {
  if (val) {
    open.open(val, '_blank')
  }
}
