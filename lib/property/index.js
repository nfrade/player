'use strict'
function currentState (key, current, prev) {
  if (!current.state.props) {
    current.state.props = (prev && prev.state && prev.state.props) || {}
  } else if (prev && prev.state && prev.state.props && !current.state.props[key]) {
    current.state.props[key] = prev.state.props[key]
  }
}

exports.components = {
  playerprop: {
    type: 'property',
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
        if (property.parent.locked.val) {
          currentState(key, current, prev)
          return true
        }
        currentState(key, current, prev)
        current.state.props[key] = stamp || property.getStamp(data)
      }
    }
  },
  instantprop: {
    type: 'playerprop',
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
  },
  videoprop: {
    type: 'playerprop',
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
  }
}
