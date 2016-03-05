'use strict'
var open = require('vigour-open')

module.exports = {
  define: {
    open (val) {
      if (val) {
        open.open(val, '_blank')
      }
    }
  },
  config: {
    id: 'bitdash-script',
    src: 'https://bitmovin-a.akamaihd.net/bitdash/beta/4.2.0-b3/bitdash.min.js'
  },
  init (src, done, ready) {
    this.postpone('bitdash', () => {
      var instance = this.instance || window.bitdash(this.id)
      var settings = getSettings(this, src)
      var _this = this
      if (instance) {
        instance.setup(settings)
        var pollReady = function () {
          // added check for isPlaying for when bitdash tells us player is ready but it will actually throw an error
          if (instance.isReady && instance.isReady()) {
            ready()
          } else {
            _this.postpone('ready', pollReady, 100)
          }
        }
        pollReady()
      } else {
        console.error('[player] could not find instance')
      }
      done(instance)
    })
  },
  dispose () {
    if (this.instance) {
      if (this.instance.destroy) {
        this.instance.unload()
        this.instance.destroy()
      }
    }
  },
  getTime () {
    return this.instance.getCurrentTime()
  },
  getDuration () {
    return this.instance.getDuration()
  },
  getBuffer () {
    // TODO buffer info
  },
  seek (val) {
    this.instance.seek(val)
  },
  setVolume (val) {
    this.postpone('volume', () => {
      this.instance.setVolume(val * 100)
    })
  },
  isStalled () {
    return this.instance.isStalled()
  },
  isPlaying (val) {
    return this.instance.isPlaying()
  },
  play () {
    this.instance.play()
  },
  pause () {
    this.instance.pause()
  },
  load (val, ready) {
    val = parseSrc(val)
    if (val) {
      this.instance
      .load(val)
      .catch((err) => console.error(err))
    }
  },
  loadSubtitle (val) {
    if (val) {
      var language = (this.config.srt && this.config.srt.language) || 'nl'
      this.instance.addSubtitle(val, 'srt', 'subtitle', language)
      this.instance.setSubtitle('srt')
    }
  }
}

function parseSrc (val) {
  if (typeof val === 'string') {
    return {
      hls: val.replace(/{type}/g, 'm3u8'),
      mpd: val.replace(/{type}/g, 'mpd')
    }
  } else {
    if (typeof val === 'object') {
      if (val.hls || val.dash) {
        return val
      } else {
        console.warn('src should at least have hls or|and dash property')
      }
    } else {
      console.warn('src is not a valid type (should be an object or a string):', val)
    }
  }
}

function getSettings (player, src) {
  var config = player.config
  var adconfig = config.advertising && config.advertising.plain()
  var settings = {
    source: typeof src === 'string' ? parseSrc(src) : src,
    key: config.apiKey.val,
    playback: {
      autoplay: true
    },
    tweaks: {
      file_protocol: true,
      app_id: 'io.vigour.app'
    },
    style: {
      ux: false,
      width: '100%'
    },
    events: {
      onReady () {
        player.ready.origin.set(true)
      },
      onError (err) {
        console.error(err)
        player.clearPostponed()
        player.clearInterval()
        player.ready.origin.set(false)
      },
      onAdStarted (a) {
        player.ad.origin.set(true)
        player.cases.$clickthroughUrl.val = a.clickthroughUrl
      },
      onAdSkipped () {
        player.ad.origin.set(false)
        player.cases.$clickthroughUrl.val = ''
      },
      onAdFinished () {
        player.ad.origin.set(false)
        player.cases.$clickthroughUrl.val = ''
      }
    }
  }
  if (adconfig) {
    settings.advertising = adconfig && adconfig
  }
  return settings
}

// function handleAds (player, settings) {
//   if (settings.advertising) {
//     let maxTries = 5
//     let tryPlayAdVideo = () => {
//       settings.postpone('builtinAds', function () {
//         let id = `bitdash-ad-video-${id}`
//         let adPlayer = document.getElementById(id)
//         if (adPlayer) {
//           adPlayer.setAttribute('webkit-playsinline', true)
//           adPlayer.setAttribute('autoplay', true)
//         } else if (maxTries--) {
//           tryPlayAdVideo()
//         }
//       }, 50)
//     }
//     tryPlayAdVideo()
//   }
// }
