'use strict'
exports.inject = require('./shared')

exports.cases = { $playerEnded: false }

exports.properties = {
  ended: { type: 'className' }
}

exports.ended = ['$', 'cases', '$playerEnded']
