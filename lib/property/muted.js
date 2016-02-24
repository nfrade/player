'use strict'
var cases = require('vigour-element/lib/cases')
var volume = require('./volume').volume
var VideoProp = require('./').Video

cases.set({
  $playerMuted: {
    val: volume,
    $transform (val) {
      return val === 0
    }
  }
})

exports.properties = {
  muted: new VideoProp({
    $type: 'boolean'
  })
}

exports.muted = cases.$playerMuted
