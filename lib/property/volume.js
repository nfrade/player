'use strict'
exports.properties = {
  volume: {
    type: 'videoprop',
    render (val, properties, children, rdata, current) {
      this.parent.setVolume(typeof val === 'number' ? val : 1)
    }
  }
}

exports.volume = 1
