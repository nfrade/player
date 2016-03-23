'use strict'
exports.define = {
  updateEnded (progress, duration) {
    if (duration && progress >= duration - 0.5) {
      this.playing.origin.set(false)
      this.ended.origin.set(true)
    } else {
      this.ended.origin.set(false)
    }
  }
}
