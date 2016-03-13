'use strict'
var DMVAST = require('vast-client')

exports.inject = require('./shared')
exports.define = { requestAd }

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
