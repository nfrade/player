'use strict'
var through = require('through2')

module.exports = function (file) {
  return through(function (buf, enc, next) {
    var str = buf.toString('utf8')
    var regex = /@import\ .*([~])/
    str = str.replace(regex, '@import "./node_modules/')
    this.push(str)
    next()
  })
}
