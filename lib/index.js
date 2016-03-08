'use strict'
require('./style.less')

var ID = 'vigour-player'

module.exports = {
  css: 'vigour-player-container',
  video: {
    widget: {
      init () {
        var div = document.createElement('div')
        div.className = 'video'
        div.id = ID
        return div
      },
      update (previous, domNode) {
        // console.info('video:update', arguments)
      }
    }
  },
  inject: [
    // utils
    require('vigour-element/lib/method/interval'),
    require('vigour-element/lib/method/postpone'),
    // properties
    require('./property'),
    require('./property/fullscreen'),
    require('./property/duration'),
    require('./property/progress'),
    require('./property/ready'),
    require('./property/locked'),
    require('./property/loading'),
    require('./property/playing'),
    require('./property/volume'),
    require('./property/config'),
    require('./property/ended'),
    require('./property/muted'),
    require('./property/misc'),
    require('./property/src'),
    require('./property/ad'),
    require('./property/id'),
    // require('./property/srt'),
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
}
