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

function interaction (toggle) {
  var $playerInteraction = this.cases.$playerInteraction
  if (toggle && $playerInteraction.val) {
    $playerInteraction.val = false
    this.clearPostponed()
  } else {
    $playerInteraction.val = true
    this.postpone(() => $playerInteraction.val = false, 2000)
  }
}
