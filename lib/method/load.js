'use strict'
exports.properties = {
  load (val) {
    this.define({
      load (src) {
        let store = this.storeContext()
        val.call(this, src, () => {
          this.applyContext(store)
          this.playing.origin.set(true)
          this.ready.origin.set(true)
        })
      }
    })
  }
}
