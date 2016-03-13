'use strict'
require('./style.less')

exports.fullscreen = {
  type: 'icon',
  css: {
    val: 'fullscreen',
    $playerFullscreen: 'fullscreen-exit',
    $prepend: 'icon-'
  },
  on: {
    click (e) {
      let fs = this.lookUp('fullscreen')
      fs.origin.val = !fs.val
    }
  }
}
