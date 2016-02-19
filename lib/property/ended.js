'use strict'
var cases = require('vigour-element/lib/cases')
var VideoProp = require('./').Video

cases.setKey('$playerEnded', false)

exports.properties = {
  ended: new VideoProp({
    $type: 'boolean'
  })
}

exports.ended = cases.$playerEnded
