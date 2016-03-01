'use strict'
exports.cases = { $playerEnded: false }

exports.properties = {
  ended: {
    type: 'videoprop',
    $type: 'boolean'
  }
}

exports.ended = ['$', 'cases', '$playerEnded']
