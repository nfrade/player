'use strict'
exports.define = {
  updateEnded (time, duration) {
    if (duration - time < 5) {
      this.playing.origin.set(false)
      this.ended.origin.set(true)
    } else {
      this.ended.origin.set(false)
    }
  }
}
