'use strict'
exports.define = {

  write (key, val, event) {
    var property = this[key]
    if (property) {
      let $ = property.$
      let dest = $
        ? this.getData().get($.slice(), {})
        : property.origin
      dest.set(val, event)
    }
  },

  read (key) {
    var property = this[key]
    if (property) {
      let $ = property.$
      let origin = $ ? this.getData().get($) : property.origin
      if (origin) {
        return origin.val
      }
    }
  },

  getData () {
    return this.state.data
  }
}
