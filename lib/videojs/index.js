'use strict'
exports.config = {
  src: '//vjs.zencdn.net/5.4.6/video.min.js',
  id: 'videojs-script'
}

exports.init = function (src, done, ready) {  
  this.postpone('videojs', function () {
    var player = this
    var instance = global.videojs(player.id, { src: src, "controls": true, "autoplay": false, "preload": "auto" }, function () {
      console.error('ready!', this)
      // this.src(src)
    })
  })

  // this.postpone('videojs', () => {
  //   var instance = global.videojs(this.id) || this.instance
  //   var settings = getSettings(this, src)
  //   var _this = this
  //   if (instance) {
  //     instance.setup(settings)
  //     let pollReady = function () {
  //       if (instance.isReady && instance.isReady()) {
  //         ready()
  //       } else {
  //         _this.postpone('ready', pollReady, 100)
  //       }
  //     }
  //     pollReady()
  //   } else {
  //     console.error('[player] could not find instance')
  //   }
  //   if (done) {
  //     done(instance)
  //   }
  // })
}

exports.dispose = function () {
  let instance = this.instance
  if (instance && instance.destroy) {
    instance.unload()
    instance.destroy()
  }
}

exports.getTime = function () {
  return this.instance.getCurrentTime()
}

exports.getDuration = function () {
  return this.instance.getDuration()
}

exports.seek = function (val) {
  this.instance.seek(val)
}

exports.setVolume = function (val) {
  this.postpone('volume', () => {
    let instance = this.instance
    if (instance.setVolume) {
      instance.setVolume(val * 100)
    }
  })
}

exports.isStalled = function () {
  return this.instance.isStalled()
}

exports.isPlaying = function (val) {
  return this.instance.isPlaying()
}

exports.play = function () {
  this.instance.play()
}

exports.pause = function () {
  this.instance.pause()
}

exports.load = function (val, ready) {
  val = parseSrc(val)
  if (val) {
    let instance = this.instance
    let streamType = instance &&
      instance.getStreamType &&
      instance.getStreamType()

    if (instance && val[streamType] && streamType !== 'progressive') {
      instance
      .load(val)
      .catch((err) => console.error(err))
    } else {
      this.dispose()
      this.init(val, false, ready)
    }
  }
}

exports.loadSubtitle = function (val) {
  if (val) {
    var language = (this.config.srt && this.config.srt.language) || 'nl'
    this.instance.addSubtitle(val, 'srt', 'subtitle', language)
    this.instance.setSubtitle('srt')
  }
}

function parseSrc (val) {
  if (typeof val === 'string') {
    if (~val.indexOf('{type}')) {
      return {
        hls: val.replace(/{type}/g, 'm3u8'),
        dash: val.replace(/{type}/g, 'mpd')
      }
    }
    if (~val.indexOf('.m3u8')) {
      return { hls: val }
    }
    if (~val.indexOf('.mpd')) {
      return { dash: val }
    }
    if (~val.indexOf('.mp4')) {
      return {
        progressive: [{
          url: val,
          type: 'video/mp4'
        }]
      }
    }
  } else {
    if (typeof val === 'object') {
      if (val.hls || val.dash || val.progressive) {
        return val
      } else {
        console.warn('src should at least have hls or|and dash property', val)
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
    source: getSource(player, src),
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
      width: '100%',
      aspectratio: '16:9'
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
      }
    }
  }
  if (adconfig) {
    settings.advertising = adconfig && adconfig
  }
  return settings
}

function getSource (player, src) {
  var obj = typeof src === 'object' ? src : parseSrc(src)
  // posters are done very badly by bitdash :(
  // var poster = player.poster.val
  // if (typeof poster === 'string') {
  //   obj.poster = poster
  // }
  return obj
}
