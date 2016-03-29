'use strict'
var clone = require('lodash.clone')

exports.inject = [
  require('./adblock'),
  require('./overlay')
]

exports.config = {
  properties: {
    ads: true
  }
}

exports.properties = {
  adSrc: {
    type: 'playerprop',
    $type: 'string',
    render (val) {
      if (!this.cases.$promoBlock.val) {
        let src = this.parent.src
        if (val) {
          src._render(val)
        }
      }
    }
  },
  adProgress: {
    type: 'playerprop',
    $type: 'number',
    render (val) {
      let player = this.parent
      let duration = player.adDuration.val
      let time = val * duration
      if (time >= duration - 0.5) {
        setTimeout(() => {
          player.playSrc(player.src.val, player.state.data)
        }, 1000)
      }
    }
  },
  adDuration: {
    type: 'playerprop'
  }
}

exports.adSrc = {
  $: 'ad.src'
}

exports.adProgress = {
  $: 'ad.progress'
}

exports.adDuration = {
  $: 'ad.duration'
}

exports.src = {
  inject (base) {
    base.define({
      _render: base.render
    })
  },
  render (val) {
    if (val) {
      var player = this.parent
      var adsconfig = player.config.ads

      if (!adsconfig || this.cases.$promoBlock.val) {
        return this._render(val)
      }

      let data = player.state.data
      data.setKey('ads', clone(adsconfig), false)
      player.playSrc(val, data)
    }
  }
}

exports.progress = {
  inject (base) {
    base.define({
      _render: base.render
    })
  },
  render (val) {
    var player = this.parent
    if (!player.adSrc.val) {
      if (!player.maybePlayAd(val)) {
        this._render.apply(this, arguments)
      }
    }
  }
}

exports.define = {
  getData () {
    var data = this.state.data
    return data.ad || data
  },
  playSrc (src, data) {
    if (data.ad) {
      data.ad.remove()
    }
    this.maybePlayAd(this.progress.val, (playAd) => {
      if (!playAd) {
        this.src._render(src)
      }
    })
  },
  maybePlayAd (progress, cb) {
    let data = this.getData()
    let ret = data.ads && data.ads.each((prop, key) => {
      if (key <= progress || (key == 1 && this.ended.val)) { // eslint-disable-line
        return prop.each((prop, key) => {
          let url = prop.val
          // if not viewed during this session
          if (typeof url !== 'number') {
            prop.val = Date.now()
            this.getAd(url, (src, creative, tracker) => {
              if (src) {
                data.set({
                  ad: {
                    url: creative.videoClickThroughURLTemplate,
                    duration: creative.url,
                    src: src,
                    progress: 0,
                    skipDelay: creative.skipDelay,
                    videoImg: data.img
                  }
                })
              }
              if (cb) {
                cb(src)
              }
            })
            return true
          }
        })
      }
    })
    if (ret) {
      return ret
    } else if (cb) {
      cb()
    }
  }
}
