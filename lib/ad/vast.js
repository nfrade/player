'use strict'
var DMVAST = require('vast-client')

exports.inject = require('./')
exports.define = { getAd }

function getAd (url, cb) {
  DMVAST.client.get(url, function (res) {
    if (res) {
      console.log('RES:', res)
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
                let src = media.fileURL
                let tracker = new DMVAST.tracker(ad, creative) // eslint-disable-line
                cb(src, creative, tracker)
                return
              }
            }
          }
        }
      }
    }
    // if not found, try again
    cb()
  })
}
