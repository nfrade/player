'use strict'
var currentState = require('vigour-element/lib/util/currentstate')
var Property = require('vigour-element/lib/property')
var P = module.exports = new Property({
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      let stamp = property.getStamp(data)
      if (prev) {
        if (prev.state.props && prev.state.props[key] === stamp) {
          currentState(key, current, prev)
          return true
        }
      }
      currentState(key, current, prev)
      current.state.props[key] = stamp || property.getStamp(data)
    }
  }
}).Constructor

P.Video = new P({
  properties: {
    render (fn) {
      this.define({
        render (val, properties, children, rdata, current, previous) {
          if (this.parent.ready.val) {
            fn.apply(this, arguments)
          }
        }
      })
    }
  }
}).Constructor

P.Instant = new P({
  define: {
    patch (event) {
      var stamp = event.stamp
      if (this._lstamp !== stamp) {
        let parent = this.parent
        if (parent && parent.state) {
          this.render(this.val)
          this._lstamp = stamp
        }
      }
    }
  }
}).Constructor
