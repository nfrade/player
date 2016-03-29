'use strict'

module.exports = {
  css: 'vigour-player',
  inject: [
    // utils
    require('vigour-element/lib/method/interval'),
    require('vigour-element/lib/method/postpone'),
    // elements
    require('./video'),
    require('./loader'),
    // events
    require('./event/remove'),
    // properties
    require('./property/fullscreen'),
    require('./property/duration'),
    require('./property/progress'),
    require('./property/channel'),
    require('./property/ready'),
    require('./property/locked'),
    require('./property/loading'),
    require('./property/playing'),
    require('./property/poster'),
    require('./property/volume'),
    require('./property/config'),
    require('./property/ended'),
    require('./property/muted'),
    require('./property/misc'),
    require('./property/src'),
    require('./property/id'),
    // require('./property/srt'),
    // methods
    require('./method/write'),
    require('./method/updateEnded'),
    require('./method/updateTime'),
    require('./method/initScript'),
    require('./method/toggle'),
    require('./method/load'),
    require('./method/misc'),
    require('./method/init')
  ]
}
