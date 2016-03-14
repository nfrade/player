'use strict'
exports.properties = {
  channel: { type: 'className' }
}

exports.channel = {
  $: 'video',
  $transform () {
    return this.lookUp('state.data._parent._parent.key') === 'channels'
  }
}
