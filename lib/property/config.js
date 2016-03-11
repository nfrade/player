'use strict'
var pkg = require('vigour-package')
var config = pkg.player || {}

exports.properties = {
  config: { type: 'base' }
}

exports.config = config
