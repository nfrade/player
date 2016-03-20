'use strict'
exports.define = {
  initScript: require('vigour-util/is/node')
  ? function (src) {
    // empty stub for node
  }
  : function (src) {
    var script = document.createElement('script')
    var store = this.storeContext()
    var config = this.config
    script.type = 'text/javascript'
    script.src = config.src.val
    script.id = config.id.val
    script.onload = () => {
      this.applyContext(store)
      this.loaded = true
      this.init(src)
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}
