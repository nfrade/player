'use strict'
exports.inject = require('./shared')

exports.lock = {
  type: 'lock'
}

exports.cases = {
  $playerLocked: true
}

exports.properties = {
  locked: {
    type: 'className',
    render (val, properties) {
      if (val) {
        this.parent.playing.origin.set(false)
      }
    }
  }
}

exports.locked = ['$', 'cases', '$playerLocked']

exports.on = {
  click: {
    locked () {
      if (this.locked.val) {
        let data = this.state.data
        if (data) {
          let rootdata = data.getRoot()
          let stateData = rootdata.state
          if (stateData) {
            let modal = stateData.modal
            if (modal) {
              modal.set({
                current: rootdata.get('modals.roadblock', {})
              })
              return
            }
          }
        }

        global.alert('Player is locked.')
      }
    }
  }
}
