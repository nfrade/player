'use strict'
exports.define = {
  toggle () {
    console.log('---- playing --->', !this.playing.val)
    this.playing.origin.set(!this.playing.val)
  }
}
