'use strict'
var ua = require('vigour-ua/navigator')
var platform = ua.platform
var MOBILEBROWSER = (platform === 'android' || platform === 'ios') && !ua.webview

exports.properties = {
  load (val) {
    this.define({
      load (src) {
        let store = this.storeContext()
        val.call(this, src, () => {
          this.applyContext(store)
          this.playing.origin.set(!MOBILEBROWSER)
          this.ready.origin.set(true)
        })
      }
    })
  }
}
