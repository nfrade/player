'use strict'
require('./style.less')

exports.progress = {
  text: {
    $: 'progress',
    $transform (val) {
      var data = this.parent.state.data
      var duration = data && data.duration
      return val * (duration ? duration.val : 0)
    },
    $time: true
  }
}
