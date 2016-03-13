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
      let player = this.parent.parent
      player.toggle()
    }
  }
}
