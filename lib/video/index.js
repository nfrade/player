'use strict'

exports.video = {
  widget: {
    init: require('vigour-util/is/node')
    ? function () {
      // empty stub for node
    }
    : function () {
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
