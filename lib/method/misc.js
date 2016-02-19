'use strict'
exports.properties = {}

defineMethodProps(
  'getDuration',
  'isPlaying',
  'getBuffer',
  'isStalled',
  'setVolume',
  'getTime',
  'dispose',
  'pause',
  'play',
  'seek'
)

function defineMethodProps () {
  for (var i = arguments.length - 1; i >= 0; i--) {
    let key = arguments[i]
    exports.properties[key] = function (val) {
      var set = {}
      set[key] = val
      this.define(set)
    }
  }
}
