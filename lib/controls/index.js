'use strict'
require('./style.less')

exports.on = {
  click: {
    interaction (e) {
      console.error('interact!')
      interaction.call(this, true)
    }
  },
  move: {
    interaction (e) {
      interaction.call(this)
    }
  }
}

exports.controls = {
  inject: [
    require('vigour-element/lib/method/postpone'),
    require('./play'),
    require('./progress'),
    require('./seekbar'),
    require('./duration'),
    require('./volume'),
    require('./fullscreen')
  ],
  cases: {
    $controlsInteraction: false
  },
  css: {
    val: 'hidden',
    $controlsInteraction: ''
  },
  on: {
    click: {
      prevent () {
        return false
      }
    }
  }
}

function interaction (toggle) {
  var $controlsInteraction = this.cases.$controlsInteraction
  if (toggle && $controlsInteraction.val) {
    $controlsInteraction.val = false
    this.clearPostponed()
  } else {
    $controlsInteraction.val = true
    this.postpone(() => $controlsInteraction.val = false, 2000)
  }
}
