'use strict'
exports.on = {
  remove: {
    dispose () {
      if (this.instance) {
        // TODO accesssing these functions crash the player sometimes
        // if (this.ready.val && this.getTime()) {
        //   console.error('update time!')
        //   this.updateTime()
        // }
        this.dispose()
      }

      this.initialised = false
      this.instance = false
      this.setTime = false

      this.ready.origin.set(false)
      this.loading.origin.set(true)
      this.fullscreen.origin.set(false, false)
    }
  }
}
