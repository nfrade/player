'use strict'
var Observable = require('vigour-js/lib/observable')
var VideoProp = require('./').Video

exports.properties = {
  volume: new VideoProp({
    $type: 'number',
    render (val, properties, children, rdata, current) {
      this.parent.setVolume(val)
    }
  })
}

exports.volume = new Observable(1)
