'use strict'
require('./style.less')

exports.video = {
  widget: {
    init () {
      var div = document.createElement('div')
      div.className = 'video'
      div.id = 'vigour-player-video'
      return div
    },
    update (previous, domNode) {
      // console.info('video:update', arguments)
    }
  }
}
