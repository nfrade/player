'use strict'
var Event = require('vigour-event')
var cnt = 0

exports.define = {
  updateTime () {
    let current = this.getTime()
    let data = this.getData()
    let $duration = data[this.duration.$]
    let duration = $duration ? $duration.val || ($duration.val = this.getDuration()) : 0
    let time = current / duration
    if (current >= this.previousTime + 0.2) {
      this.loading.origin.set(this.isStalled())
      this.updateEnded(current, duration)
      let stamp = '$vp' + (cnt++)
      let event = new Event('data', stamp)
      this.write('progress', time, event)
      event.trigger()
    } else {
      this.loading.origin.set(true)
    }
    this.previousTime = current
  }
}
