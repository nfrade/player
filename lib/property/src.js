'use strict'
exports.inject = require('./shared')

exports.properties = {
  src: {
    type: 'playerprop',
    $type: 'string',
    render (val) {
      if (val) {
        let player = this.parent
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
