'use strict'
exports.cases = {
  $playerAd: false,
  $clickthroughUrl: false
}

exports.properties = {
  ad: {
    type: 'videoprop',
    $type: 'boolean'
  },
  clickthroughUrl: {
    type: 'playerprop',
    $type: 'string'
  }
}

exports.ad = ['$', 'cases', '$playerAd']
exports.clickthroughUrl = ['$', 'cases', '$clickthroughUrl']
