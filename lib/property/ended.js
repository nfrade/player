'use strict'
var cases = require('vigour-element/lib/cases')
// var VideoProp = require('./').Video

cases.set({
  $playerEnded: false
})

exports.properties = {
  ended: {
    type: 'vigourprop',
    $type: 'boolean'
  }
}

exports.ended = cases.$playerEnded
