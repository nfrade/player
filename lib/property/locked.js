'use strict'
exports.cases = {
  $playerLocked: false
}

exports.properties = {
  locked: {
    type: 'property',
    $type: 'boolean',
    render (val, properties) {
      if (val) {
        if (!properties.className) {
          properties.className = 'locked'
        } else {
          properties.className += ' locked'
        }
        this.parent.playing.origin.set(false)
      }
    }
  }
}

exports.locked = ['$', 'cases', '$playerLocked']
