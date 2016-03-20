'use strict'
require('blockadblock')

module.exports = function (base, event) {
  var blockAdBlock = global.blockAdBlock
  var cases = base.cases

  cases.set({
    $blocked: false
  }, event)

  if (blockAdBlock) {
    blockAdBlock.on(true, function () {
      cases.$blocked.val = true
      blockAdBlock.clearEvent()
    })
  }
}
