'use strict'
var ua = require('vigour-ua/navigator')
var platform = ua.platform
var MOBILEBROWSER = (platform === 'android' || platform === 'ios') && !ua.webview

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
              videos[i].addEventListener('webkitendfullscreen', () => {
                document.body.scrollTop = 0
                this.playing.origin.set(false)
              }, false)
            }
          }, () => {
            // on ready
            this.applyContext(store)
            this.playing.origin.set(!MOBILEBROWSER)
            this.ready.origin.set(true)
            // hacky force ready update
            this.ready.render(true)
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
