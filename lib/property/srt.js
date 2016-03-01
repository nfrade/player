'use strict'

exports.properties = {
  srt: {
    type: 'playerprop',
    $type: 'string',
    render (val, properties, children, rdata, current, previous) {
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
