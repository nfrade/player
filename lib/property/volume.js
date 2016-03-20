'use strict'
exports.inject = require('./shared')

exports.properties = {
  volume: {
    type: 'videoprop',
    render (val) {
      this.parent.setVolume(typeof val === 'number' ? val : 1)
    }
  }
}

exports.volume = 1
