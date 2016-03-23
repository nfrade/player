'use strict'
require('./style.less')

module.exports = function (base) {
  if (base.cases.$desktop.val) {
    let setVolume = function setVolume (volume, domNode) {
      let nodes = domNode.childNodes
      var value = volume * 5
      for (var i = nodes.length - 1; i >= 0; i--) {
        nodes[i].firstChild.className = i < value ? 'active' : 'inactive'
      }
    }
    base.set({
      volume: {
        container: {
          widget: {
            init () {
              var domNode = document.createElement('div')
              domNode.className = 'container'
              var five = 5
              while (five--) {
                let bar = document.createElement('div')
                bar.appendChild(document.createElement('div'))
                domNode.appendChild(bar)
              }
              var vol = this.state.elem.parent.parent.lookUp('volume')
              setVolume(vol.val, domNode)
              return domNode
            },
            update (volume, domNode) {
              if (typeof volume !== 'number') {
                volume = 1 // look for it
              }
              setVolume(volume, domNode)
            }
          }
        },
        on: {
          drag (e) {
            var node = e.currentTarget
            var rect = node.getBoundingClientRect()
            var x = rect.left
            var nr = (e.x - x) / (rect.right - x)
            var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
            var vol = this.parent.lookUp('volume')
            vol.__input = val
            vol.render(val)
            this.container.widget.prototype.update.call(this, val, node.firstChild)
          }
        }
      }
    })
  }
}
