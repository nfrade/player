'use strict'
var volume = require('./volume').volume

exports.inject = require('./shared')

exports.cases = {
  $playerMuted: {
    val: volume,
    $transform (val) {
      return val === 0
    }
  }
}

exports.properties = {
  muted: {
    type: 'className'
  }
}

exports.muted = ['$', 'cases', '$playerMuted']
