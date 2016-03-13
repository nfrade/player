'use strict'
require('./style.less')

var ua = require('vigour-ua/navigator')

exports.inject = require('../shared')

exports.properties = {
  fullscreen: {
    type: 'instantprop',
    $type: 'boolean',
    render: ua.webview
      ? ua.device === 'phone'
        ? require('./phone')
        : require('./tablet')
      : require('./web')
  }
}

exports.fullscreen = ['$', 'cases', '$playerFullscreen']

exports.cases = { $playerFullscreen: false }
