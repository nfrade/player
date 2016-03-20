'use strict'
// this is mock file for node, for fullscreen prop go to browser.js
exports.properties = {
  fullscreen: {
    type: 'instantprop'
  }
}

exports.cases = { $playerFullscreen: false }

exports.fullscreen = ['$', 'cases', '$playerFullscreen']
