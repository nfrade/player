'use strict'
var DMVAST = require('vast-client')

module.exports = function (base, event) {
  var Obs = base.components.observable.Constructor
  var srcrender = base.src.render
  base.cases.set({
    $playerAd: false
  }, event)
  base.src.define({
    render (val) {
      if (val) {
        let player = this.parent
        let ads = player.config.ads
        if (!ads) {
          srcrender.call(this, val)
          return
        }
        let $playerAd = player.cases.$playerAd
        let data = player.state.data
        let srcstamp = player.state.props.src
        let progress = player.progress.val
        let adstore = {}
        let preroll

        let setAd = (adroll) => {
          let urls = []
          let callback = (adsrc) => {
            if (adsrc) {
              player.__input = player.state.data = new Obs()
              player.ended.on((e) => {
                if (e === true) {
                  requestAd(urls, callback)
                }
              }, 'adEnd')
              $playerAd.set(true)
              srcrender.call(this, adsrc)
            } else {
              player.state.props.src = srcstamp
              player.__input = player.state.data = data
              playVideo()
            }
          }
          adroll.each((prop, i) => urls.push(prop.val))
          requestAd(urls, callback)
        }
        let playVideo = () => {
          let $progress = player.progress.$
          let progress = data[$progress]
          srcrender.call(this, val)
          progress.on((e, event, player) => {
            let lastindex
            for (var i in adstore) {
              if (e >= i / 100) {
                lastindex = adstore[i] && i
              }
            }
            if (lastindex) {
              adstore[lastindex] = false
              setAd(ads[lastindex])
            }
          }, 'adProgress')
          $playerAd.set(false)
        }
        if (typeof progress !== 'number') {
          progress = 0
        }
        ads.each((prop, i) => {
          if (i / 100 <= progress) {
            adstore[i] = false
            preroll = prop
          } else {
            adstore[i] = true
          }
        })
        if (preroll) {
          setAd(preroll)
        } else {
          playVideo()
        }
      }
    }
  })
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
                break
                // player.vastTracker = new DMVAST.tracker(ad, creative);
                // player.vastTracker.on('clickthrough', function(url)
                // {
                //     document.location.href = url;
                // });
                // player.on('canplay', function() {this.vastTracker.load();});
                // player.on('timeupdate', function() {this.vastTracker.setProgress(this.currentTime);});
                // player.on('play', function() {this.vastTracker.setPaused(false);});
                // player.on('pause', function() {this.vastTracker.setPaused(true);});
              }
            }
          }
        }
      }
    }
    if (adsrc) {
      callback(adsrc)
    } else {
      requestAd(urls, callback)
    }
  })
}
