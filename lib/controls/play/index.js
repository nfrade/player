'use strict'
require('./style.less')

exports.play = {
  type: 'icon',
  css: {
    val: 'play-o',
    $playerPlaying: 'pause-o',
    $prepend: 'icon-'
  },
  on: {
    click () {
      if (!exports.block) {
        let player = this.parent.parent.parent
        player.toggle()
      }
    }
  }
}
