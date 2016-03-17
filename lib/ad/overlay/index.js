'use strict'
require('./style.less')

var open = require('vigour-open')

exports.inject = require('../../controls/component')

exports.controls = {
  display: {
    $: 'ad.src',
    $transform (val) {
      return val ? 'none' : null
    }
  }
}

exports.skip = {
  $: 'ad',
  css: {
    $: 'progress',
    $transform (val) {
      return skipTime(this, val) ? '' : 'clickable'
    }
  },
  display: {
    $: 'skipDelay',
    $transform (val) {
      return val ? null : 'none'
    }
  },
  title: {
    html: {
      $: 'progress',
      $transform (val) {
        let timeLeft = skipTime(this, val)
        return timeLeft ? 'You can skip to video in ' + timeLeft : 'Skip Ad >>'
      }
    }
  },
  thumb: {
    $: 'videoImg',
    type: 'img',
    src: { $: true }
  },
  on: {
    click () {
      this.state.data.remove()
    }
  }
}

exports.advertisement = {
  type: 'controls',
  $: 'ad',
  adText: {
    title: {
      text: {
        $: 'progress',
        $transform (val) {
          let data = this.parent.state.data
          let duration = data && data.duration && data.duration.val
          let translation = data.getRoot().get(['text', 'advertisement'])
          let str = translation ? translation.val : 'Advertisement'
          if (duration) {
            let s = Math.ceil(duration * (1 - val))
            return str + '  -  ' + (s < 10 ? '0:0' + s : s < 60 ? '0:' + s : ~~(s / 60) + ':' + s % 60)
          }
          return str
        }
      }
    },
    clickurl: {
      type: 'property',
      $: 'url'
    },
    on: {
      click () {
        let url = this.clickurl.val
        if (url) {
          open.open(url, '_blank')
        }
      }
    }
  },
  define: {
    scrub () {}
  }
}

function skipTime (self, progress) {
  var data = self.parent.state.data
  var skipDelay = data.skipDelay
  var duration = data.duration
  if (skipDelay) {
    if (duration) {
      let time = duration.val * progress
      let skipTime = skipDelay.val - time
      if (skipTime > 0) {
        return Math.ceil(skipTime)
      } else {
        return false
      }
    }
    return skipDelay.val
  }
}
