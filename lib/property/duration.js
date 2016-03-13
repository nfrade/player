'use strict'
exports.inject = require('./shared')

exports.properties = {
  duration: {
    type: 'videoprop',
    $type: 'number'
  }
}

exports.duration = {
  $: 'duration'
}
