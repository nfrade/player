'use strict'
var ua = require('vigour-ua/navigator')

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