'use strict'
var VideoProp = require('./').Video

exports.properties = {
  duration: new VideoProp({
    $type: 'number'
  })
}

exports.duration = {
  $: 'duration'
}
