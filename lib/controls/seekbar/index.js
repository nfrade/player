'use strict'
require('./style.less')

exports.seekbar = {
  on: {
    down (e) {
      // if (!exports.block) {
      //   let cases = this.cases
      //   seek = (cases.$touch.val && cases.$playerFullscreen.val)
      //     ? rotatedSeek
      //     : normalSeek
      //   seek.call(this, e)
      // } else {
      //   seek = false
      // }
    },
    drag (e) {
      // if (!exports.block) {
      //   if (seek) {
      //     seek.call(this, e)
      //   } else {
      //     let cases = this.cases
      //     seek = (cases.$touch.val && cases.$playerFullscreen.val)
      //       ? rotatedSeek
      //       : normalSeek
      //     seek.call(this, e)
      //   }
      // }
    }
  },
  seek: {
    bar: {
      w: {
        $: 'progress',
        $transform (val) {
          return val * 100 + '%'
        }
      },
      button: {}
    }
  }
}
