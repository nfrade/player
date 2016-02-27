'use strict'
exports.properties = {
  init (val) {
    this.define({
      init (src) {
        if (this.loaded) {
          let store = this.storeContext()
          val.call(this, src, (instance) => {
            // init callback
            this.applyContext(store)
            this.instance = instance
            let videos = document.getElementsByTagName('video')
            for (let i = videos.length - 1; i >= 0; i--) {
              videos[i].setAttribute('webkit-playsinline', true)
            }
          }, () => {
            // on ready
            this.applyContext(store)
            this.playing.origin.set(true)
            this.ready.origin.set(true)
          })
        } else if (!this.initialised) {
          this.loading.origin.set(true)
          this.initScript(src)
        }
        this.initialised = true
      }
    })
  }
}
