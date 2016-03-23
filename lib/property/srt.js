'use strict'
exports.inject = require('./shared')

exports.properties = {
  srt: {
    type: 'videoprop',
    $type: 'string',
    render (val) {
      var player = this.parent
      if (val) {
        player.loadSubtitle(val)
      }
    }
  }
}

exports.srt = {
  $: 'srt'
}
