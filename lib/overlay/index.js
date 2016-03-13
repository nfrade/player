'use strict'
require('./style.less')

exports.overlay = {
  inject: [
    require('./controls'),
    require('./loader')
  ]
}

// var seek

// function checkAd () {
//   let $playerAd = this.cases.$playerAd
//   return $playerAd && $playerAd.val
// }

// function normalSeek (e) {
//   if (checkAd.call(this)) return
//   var rect = e.currentTarget.getBoundingClientRect()
//   var x = rect.left
//   var nr = (e.x - x) / (rect.right - x)
//   var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
//   var progress = this.seek.bar.state.data.progress
//   if (progress) {
//     progress.origin.val = val
//   }
// }

// function rotatedSeek (e) {
//   if (checkAd.call(this)) return
//   var rect = e.currentTarget.getBoundingClientRect()
//   var x = rect.top
//   var nr = (e.y - x) / rect.height
//   var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
//   var progress = this.seek.bar.state.data.progress
//   if (progress) {
//     progress.origin.val = val
//   }
// }

// function showOverlay (event) {
//   this.cursor.__input = 'auto'
//   this.cursor.patch(event)
//   this.controls.opacity.__input = 1
//   this.controls.opacity.patch(event)
//   this.parent.postpone('controls', function () {
//     let e = {stamp: 'fix'}
//     this.overlay.cursor.__input = 'none'
//     this.overlay.cursor.patch(e)
//     this.overlay.controls.opacity.__input = 0
//     this.overlay.controls.opacity.patch(e)
//   }, 2000)
// }



// exports.overlay.controls.opacity = 0
// exports.overlay.on.touchstart = function (e, event) {
//   if (this.controls.opacity.__input === 0 && this.cases.$playerPlaying.val) {
//     exports.block = true
//   } else {
//     exports.block = false
//   }
//   showOverlay.call(this, event)
// }
// exports.overlay.on.move = function (e, event) {
//   if (this.controls.opacity.__input === 0) {
//     exports.block = true
//   } else {
//     exports.block = false
//   }
//   showOverlay.call(this, event)
// }

// function setVolume (volume, domNode) {
//   let nodes = domNode.childNodes
//   var value = volume * 5
//   for (var i = nodes.length - 1; i >= 0; i--) {
//     nodes[i].firstChild.className = i < value ? 'active' : 'inactive'
//   }
// }
