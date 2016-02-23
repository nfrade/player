'use strict'
var cases = require('vigour-element/lib/cases')
var VideoProp = require('./').Video

cases.set({
  $playerLoading: false
})

exports.properties = {
  loading: new VideoProp({
    $type: 'boolean',
    render (val, properties, children, rdata, current) {
      // var player = this.parent
      // player.setVolume(val ? 0 : player.volume.val)
    }
  })
}

exports.loading = cases.$playerLoading
