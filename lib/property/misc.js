'use strict'
var variables = {
  scriptLoaded: null,
  previousTime: null,
  initialised: null,
  instance: null,
  setTime: null
}

exports.define = {}

for (let i in variables) {
  exports.define[i] = {
    set (val) {
      variables[i] = val
    },
    get () {
      return variables[i]
    }
  }
}
