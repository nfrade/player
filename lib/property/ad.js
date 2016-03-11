'use strict'
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

module.exports = function injectAd (base, event) {
  let Element = base.ChildType
  let cases = base.cases
  let thunkRender = Element.Thunk.prototype.render

  base.set({
    widget: {
      remove () {
        let elem = this.state.elem
        elem.clearPostponed()
        elem.clearInterval()
      },
      init () {
        if (!thunkRender) {
          let Element = this.state.elem.ChildType
          thunkRender = Element.Thunk.prototype.render
        }
        checkAd.call(this, this)
        this.vnode = thunkRender.call(this)
        return createElement(this.vnode)
      },
      update (previous, domNode) {
        checkAd.call(this, previous)
        var newTree = thunkRender.call(this, previous)
        patch(domNode, diff(previous.vnode, newTree))
        this.vnode = newTree
      }
    },
    cases: {
      $playerAd: false,
      $clickthroughUrl: false
    },
    properties: {
      clickthroughUrl: {
        type: 'playerprop',
        $type: 'string'
      }
    },
    adData: { type: 'observable' },
    clickthroughUrl: ['$', 'cases', '$clickthroughUrl']
  }, event)

  // **TODO** add adsDone check! (when all ads have played, dont check all this stuff anymore)
  function checkAd (previous) {
    let state = previous.state
    let elem = state.elem
    let ads = elem.config.ads
    if (ads) {
      if (!state.props) {
        state.props = {}
      }
      let props = state.props
      let data = state.data
      let src = data[elem.src.$]
      let srcstamp = elem.src.getStamp(src)
      let prevstamp = props.src
      if (srcstamp !== prevstamp) {
        if (props.realSrc !== srcstamp) {
          props.currAdRoll = null
          props.realData = data
          props.adStore = {}
          ads.each((prop, i) => props.adStore[i] = true)
          props.realSrc = srcstamp
        }
      }
      if (!props.currAdRoll) {
        let adStore = props.adStore
        if (adStore) {
          let $progress = data[elem.progress.$]
          let progress = $progress ? $progress.val : 0
          let last
          for (let i in adStore) {
            if (i === 0 || i / 100 <= progress) {
              console.error('!!', i, progress)
              last = ads[i]
              delete adStore[i]
            }
          }
          if (last) {
            props.currAdRoll = []
            last.each((prop) => props.currAdRoll.push(prop.val))
          }
        }
        playNextAd(props, elem, state, cases)
      }
    }
  }

  function playNextAd (props, elem, state) {
    if (props.currAdRoll) {
      let adSrc = props.currAdRoll[0]
      // play the first in the current roll
      let adData = new elem.adData.Constructor({
        progress: 0,
        video: adSrc
      })
      elem.__input = state.data = adData
      elem.ended.origin.once((e, event) => {
        if (e === true) {
          if (props.currAdRoll) {
            playNextAd(props, elem, state)
          } else {
            elem.__input = elem.state.data = props.realData
            cases.$playerAd.set(false, event)
          }
        }
      }, 'adEnd')
      cases.$playerAd.val = true
      // shift
      if (props.currAdRoll.length === 1) {
        props.currAdRoll = null
      } else {
        props.currAdRoll.shift()
      }
    }
  }
}
