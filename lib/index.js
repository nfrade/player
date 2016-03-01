'use strict'
var ID = 'vigour-player'

function currentState (key, current, prev) {
  if (!current.state.props) {
    current.state.props = (prev && prev.state && prev.state.props) || {}
  } else if (prev && prev.state && prev.state.props && !current.state.props[key]) {
    current.state.props[key] = prev.state.props[key]
  }
}

module.exports = {
  css: 'vigour-player-container',
  video: {
    widget: {
      init () {
        var div = document.createElement('div')
        div.className = 'video'
        div.id = ID
        return div
      },
      update (previous, domNode) {
        // console.info('video:update', arguments)
      }
    }
  },
  components: {
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
  },
  inject: [
    // utils
    require('vigour-element/lib/method/interval'),
    require('vigour-element/lib/method/postpone'),
    // properties
    require('./property/fullscreen'),
    require('./property/duration'),
    require('./property/ready'),
    require('./property/locked'),
    require('./property/loading'),
    require('./property/playing'),
    require('./property/volume'),
    require('./property/config'),
    require('./property/ended'),
    require('./property/muted'),
    require('./property/time'),
    require('./property/misc'),
    require('./property/src'),
    require('./property/ad'),
    require('./property/id'),
    // methods
    require('./method/updateEnded'),
    require('./method/updateTime'),
    require('./method/initScript'),
    require('./method/toggle'),
    require('./method/load'),
    require('./method/misc'),
    require('./method/init'),
    require('./overlay'),
    require('./remove')
  ]
}
