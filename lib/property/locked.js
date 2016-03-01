'use strict'
exports.cases = {
  $playerLocked: false
}

exports.properties = {
  locked: {
    type: 'property',
    $type: 'boolean',
    render (val, properties) {
      if (!properties.className) {
        properties.className = 'locked'
      } else {
        properties.className += ' locked'
      }
    }
  }
}

exports.locked = ['$', 'cases', '$playerLocked']
