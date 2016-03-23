'use strict'
require('./style.less')

exports.inject = require('vigour-element/lib/method/postpone')

exports.on = {
  click: {
    interaction (e) {
      if (this.cases.$touch.val) {
        interaction.call(this, true)
      }
    }
  },
  move: {
    interaction (e) {
      interaction.call(this)
    }
  }
}

exports.components = {
  controls: {
    inject: [
      require('./play'),
      require('./progress'),
      require('./seekbar'),
      require('./duration'),
      require('./volume'),
      require('./fullscreen')
    ],
    cases: {
      $playerInteraction: false
    },
    css: {
      val: 'hidden',
      $playerInteraction: ''
    },
    on: {
      click: {
        prevent () {
          return false
        }
      }
    }
  }
}

function interaction (toggle) {
  var $playerInteraction = this.cases.$playerInteraction
  if (toggle && $playerInteraction.val) {
    $playerInteraction.val = false
    this.clearPostponed()
  } else {
    $playerInteraction.val = true
    this.postpone(() => {
      $playerInteraction.val = false
      // **TODO** manual update shouldn't be necessary
      this.controls.css.emit('data')
    }, 2000)
  }
  // **TODO** manual update shouldn't be necessary
  this.controls.css.emit('data')
}

