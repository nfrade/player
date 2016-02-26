'use strict'
exports.cases = { $playerEnded: false }

exports.properties = {
  ended: {
    type: 'vigourprop',
    $type: 'boolean'
  }
}

exports.ended = ['$', 'cases', '$playerEnded']
