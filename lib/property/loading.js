'use strict'
exports.inject = require('./shared')

exports.cases = { $playerLoading: true }

exports.properties = {
  loading: { type: 'className' }
}
exports.loading = ['$', 'cases', '$playerLoading']
