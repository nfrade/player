'use strict'
var Observable = require('vigour-observable')
// var VideoProp = require('./').Video

exports.properties = {
  volume: {
    type: 'videoprop',
    $type: 'number',
    render (val, properties, children, rdata, current) {
      this.parent.setVolume(val)
    }
  }
}

exports.volume = new Observable(1)
