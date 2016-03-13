'use strict'
var DMVAST = require('vast-client')
var define = exports.define = {}
var Observable
var renderSrc

exports.inject = function (base, event) {
  Observable = base.components.observable.Constructor
  renderSrc = base.src.render
}

exports.cases = {
  $playerAd: false
}

exports.src = {
  render (val) {
    if (val) {
      let player = this.parent
      let ads = player.config.ads

      if (!ads) {
        renderSrc.call(this, val)
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

define.playAdRoll = function (adStore, adRoll, data, originalStamp) {
  var urls = []
  var callback = (adsrc, tracker) => {
    if (adsrc) {
      this.setAdData(tracker)
      this.ended.on((e) => {
        if (e === true) {
          requestAd(urls, callback)
        }
      }, 'adEnd')
      this.cases.$playerAd.set(true)
      renderSrc.call(this.src, adsrc)
    } else {
      this.restoreData(data, originalStamp)
      this.playVideo(adStore, data, originalStamp)
    }
  }
  adRoll.each((prop, i) => urls.push(prop.val))
  requestAd(urls, callback)
}

define.playVideo = function (adStore, data, originalStamp) {
  renderSrc.call(this.src, this.src.val)
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
}

define.setAdData = function (tracker) {
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
}

define.restoreData = function (data, stamp) {
  this.state.props.src = stamp
  this.state.data = data
  this.__input = data
}

function requestAd (urls, callback) {
  var requrl = urls[0]
  if (!requrl) {
    callback()
    return
  }
  urls.shift()
  DMVAST.client.get(requrl, function (res) {
    var adsrc
    var tracker
    if (res) {
      let ads = res.ads
      let i = ads.length - 1
      for (; i >= 0; i--) {
        let ad = ads[i]
        let creatives = ad.creatives
        let j = creatives.length - 1
        for (; j >= 0; j--) {
          let creative = creatives[j]
          if (creative.type === 'linear') {
            let files = creative.mediaFiles
            let k = files.length - 1
            for (; k >= 0; k--) {
              let media = files[k]
              if (media.mimeType === 'video/mp4') {
                adsrc = media.fileURL
                tracker = new DMVAST.tracker(ad, creative) // eslint-disable-line
                break
              }
            }
          }
        }
      }
    }
    if (adsrc) {
      callback(adsrc, tracker)
    } else {
      requestAd(urls, callback)
    }
  })
}
