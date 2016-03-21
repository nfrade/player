'use strict'
var through = require('through2')

module.exports = function (file) {
  return /\.less/.test(file)
  ? through(function (buf, enc, next) {
      var str = buf.toString('utf8')
      var regex = /@import\ .*([~])/
      this.push(str.replace(regex, '@import "./node_modules/'))
      next()
    })
  : through()
}
