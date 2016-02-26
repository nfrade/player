'use strict'
exports.properties = {
  volume: {
    type: 'videoprop',
    $type: 'number',
    render (val, properties, children, rdata, current) {
      this.parent.setVolume(val)
    }
  }
}

exports.volume = 1
