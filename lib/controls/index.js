'use strict'
require('./style.less')
var controls = exports.controls = {}

controls.cases = { $controlsInteraction: false }

controls.inject = [
  require('vigour-element/lib/method/postpone'),
  require('./play'),
  require('./progress'),
  require('./seekbar'),
  require('./duration'),
  require('./volume'),
  require('./fullscreen')
]

controls.on = {
  click: {
    prevent (e) {
      var $controlsInteraction = this.cases.$controlsInteraction
      $controlsInteraction.val = true
      this.postpone(() => $controlsInteraction.val = false, 2000)
      return false
    }
  }
}

controls.css = {
  val: 'hidden',
  $controlsInteraction: ''
}

controls.hidden = ['$', 'cases', '$controlsInteraction']
