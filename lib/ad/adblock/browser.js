'use strict'
require('blockadblock')

module.exports = function (base, event) {
  var blockAdBlock = global.blockAdBlock
  var cases = base.cases

  cases.set({
    $promoBlock: false
  }, event)

  if (blockAdBlock) {
    blockAdBlock.on(true, function () {
      cases.$promoBlock.val = true
      blockAdBlock.clearEvent()
    })
  }
}
