'use strict'
var volume = require('./volume').volume

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
    type: 'videoprop',
    $type: 'boolean'
  }
}

exports.muted = ['$', 'cases', '$playerMuted']
