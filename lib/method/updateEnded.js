'use strict'
exports.define = {
  updateEnded (time, duration) {
    if (duration && duration - time < 1) {
      this.playing.origin.set(false)
      this.ended.origin.set(true)
    } else {
      this.ended.origin.set(false)
    }
  }
}
