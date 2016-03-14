'use strict'
var components = exports.components = {}

var render = function (val, properties) {
  if (val) {
    if (!properties.className) {
      properties.className = this.key
    } else {
      properties.className += ' ' + this.key
    }
  }
}

components.className = {
  type: 'property',
  $type: 'boolean',
  properties: {
    render (fn) {
      this.define({
        render (val, properties) {
          render.apply(this, arguments)
          fn.apply(this, arguments)
        }
      })
    }
  },
  define: { render }
}

components.playerprop = {
  type: 'property',
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      let stamp = property.getStamp(data)
      if (prev) {
        if (prev.state.props && prev.state.props[key] === stamp) {
          transferState(key, current, prev)
          return true
        }
      }
      if (property.parent.locked.val) {
        transferState(key, current, prev)
        return true
      }
      transferState(key, current, prev)
      current.state.props[key] = stamp || property.getStamp(data)
    }
  }
}

components.instantprop = {
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
}

components.videoprop = {
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

function transferState (key, current, prev) {
  var currentState = current.state
  var currentProps = currentState.props
  if (!currentProps) {
    currentState.props = (prev && prev.state && prev.state.props) || {}
  } else {
    let previousState = prev && prev.state
    if (previousState) {
      let previousProps = previousState.props
      if (previousProps && !currentProps[key]) {
        currentProps[key] = previousProps[key]
      }
    }
  }
}
