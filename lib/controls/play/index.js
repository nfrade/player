'use strict'
exports.play = {
  type: 'icon',
  css: {
    val: 'play-o',
    $playerPlaying: 'pause-o',
    $prepend: 'icon-'
  },
  on: {
    click: {
      toggle () {
        let player = this.parent.parent
        player.toggle()
      }
    }
  }
}
