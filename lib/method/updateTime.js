'use strict'
var Event = require('vigour-event')
var cnt = 0

exports.define = {
  updateTime () {
    let current = this.getTime()
    let data = this.state.data
    let duration = data.duration ? data.duration.val : 0
    let time = current / duration
    if (current >= this.previousTime + 0.2) {
      this.loading.origin.set(this.isStalled())
      this.updateEnded(current, duration)
      let stamp = '$vp' + (cnt++)
      let event = new Event('data', stamp)
      data.progress.set(time, event)
      event.trigger()
    } else {
      this.loading.origin.set(true)
    }
    this.previousTime = current
  }
}
