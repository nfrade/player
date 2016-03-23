'use strict'
var ua = require('vigour-ua/navigator')

exports.inject = [
  require('../shared'),
  function (base, event) {
    if (base.cases.$desktop.val) {
      base.set({
        on: {
          dblclick: {
            fullscreen () {
              this.write('fullscreen', !this.fullscreen.val)
            }
          }
        }
      }, event)
    }
  }
]

exports.properties = {
  fullscreen: {
    type: 'instantprop'
  }
}

exports.cases = { $playerFullscreen: false }

exports.fullscreen = ['$', 'cases', '$playerFullscreen']
