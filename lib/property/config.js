'use strict'
var pkg = require('vigour-package')

exports.properties = {
  config: { type: 'base' }
}

exports.config = pkg.player || {}
