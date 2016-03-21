'use strict'
require('blockadblock')

module.exports = function (base, event) {
  var blockAdBlock = global.blockAdBlock
  var cases = base.cases

  cases.set({
    $adBlock: false
  }, event)

  if (blockAdBlock) {
    blockAdBlock.on(true, function () {
      cases.$adBlock.val = true
      blockAdBlock.clearEvent()
    })
  }
}
