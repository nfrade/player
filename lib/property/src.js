'use strict'
exports.properties = {
  src: {
    type: 'playerprop',
    $type: 'string',
    render (val, properties, children, rdata, current, previous) {
      if (val) {
        var player = this.parent
        if (player.initialised) {
          player.ready.origin.set(false)
          player.ready.render(false)
          player.load(val)
        } else {
          player.init(val)
        }
      }
    }
  }
}

exports.src = {
  $: 'video'
}
