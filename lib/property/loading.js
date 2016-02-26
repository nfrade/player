'use strict'
exports.cases = { $playerLoading: false }

exports.properties = {
  loading: {
    type: 'videoprop',
    $type: 'boolean',
    render (val, properties, children, rdata, current) {
      // var player = this.parent
      // player.setVolume(val ? 0 : player.volume.val)
    }
  }
}

exports.loading = ['$', 'cases', '$playerLoading']
