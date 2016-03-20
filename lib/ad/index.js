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
      var src = this.parent.src
      if (val) {
        src._render(val)
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
          player.src.render(player.src.val)
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
    var player = this.parent
    var adsconfig = player.config.ads

    if (!adsconfig) {
      return this._render(val)
    }

    let data = player.state.data

    if (data.ad) {
      data.ad.remove()
    }

    if (!data.ads) {
      data.setKey('ads', clone(adsconfig), false)
    }

    player.maybePlayAd(player.progress.val, (playAd) => {
      if (!playAd) {
        console.info('- _render:', val)
        this._render(val)
      }
    })
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
  maybePlayAd (progress, cb) {
    let data = this.getData()
    let ret = data.ads && data.ads.each((prop, key) => {
      if (key <= progress) {
        return prop.each((prop, key) => {
          let url = prop.val
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
