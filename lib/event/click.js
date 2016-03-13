'use strict'
module.exports = function (base) {
  if (base.cases.$desktop.val) {
    base.set({
      on: {
        click: {
          toggle () {
            this.playing.origin.set(!this.playing.val)
          }
        },
        dblclick: {
          fullscreen () {
            this.fullscreen.origin.set(!this.fullscreen.val)
          }
        }
      }
    })
  }
}
