'use strict'
exports.on = {
  remove: {
    player () {
      console.error('REMOVE!!!')
      if (this.instance) {
        if (this.ready.val) {
          this.updateTime()
        }
        this.dispose()
      }

      this.initialised = false
      this.instance = false
      this.setTime = false

      this.ready.origin.set(false)
      this.loading.origin.set(true)
    }
  }
}
