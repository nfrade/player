'use strict'
var cases = require('vigour-element/lib/cases')
var VideoProp = require('./').Video

cases.set({
  $playerAd: false
})

exports.properties = {
  ad: new VideoProp({
    $type: 'boolean'
  })
}

exports.ad = cases.$playerAd
