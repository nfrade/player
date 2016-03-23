'use strict'
// require('./style.less')

exports.fullscreen = {
  type: 'icon',
  css: {
    val: 'fullscreen',
    $playerFullscreen: 'fullscreen-exit',
    $prepend: 'icon-'
  },
  on: {
    click: {
      fullscreen (e) {
        let fullscreen = this.parent.lookUp('fullscreen')
        fullscreen.origin.val = !fullscreen.val
      }
    }
  }
}
