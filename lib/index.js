'use strict'
var ID = 'vigour-player'
var Element = require('vigour-element/lib')

// we dont want this of course
module.exports = new Element({
  css: 'vigour-player-container',
  video: {
    order: -1,
    attributes: { id: ID }
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
