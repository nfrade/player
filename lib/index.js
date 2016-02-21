'use strict'
var Event = require('vigour-js/lib/event')
var ID = 'vigour-player'
var Element = require('vigour-element/lib')

// we dont want this of course
module.exports = new Element({
  css: 'vigour-player-container',
  video: {
    widget: {
      destroy () {
        // var player = this.state.elem.parent
        // var event = new Event('remove')
        // player._on.removeEmitter.execInternal(player, event)
        // event.trigger()
      },
      init () {
        var div = document.createElement('div')
        div.className = 'video'
        div.id = ID
        return div
      },
      update (previous, domNode) {
        console.info('video:update', arguments)
      }
    }
  },
  inject: [
    // utils
    require('vigour-element/lib/methods/interval'),
    require('vigour-element/lib/methods/postpone'),
    // properties
    require('./property/fullscreen'),
    require('./property/duration'),
    require('./property/loading'),
    require('./property/playing'),
    require('./property/volume'),
    require('./property/config'),
    require('./property/ready'),
    require('./property/ended'),
    require('./property/muted'),
    require('./property/time'),
    require('./property/misc'),
    require('./property/src'),
    require('./property/ad'),
    require('./property/id'),
    // methods
    require('./method/updateEnded'),
    require('./method/updateTime'),
    require('./method/initScript'),
    require('./method/toggle'),
    require('./method/load'),
    require('./method/misc'),
    require('./method/init'),
    require('./overlay'),
    require('./remove')
  ]
})
