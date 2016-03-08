'use strict'
// var ua = require('vigour-ua/navigator')
// ua.webview = true

var DOM = require('vigour-util/is/node') ? {} : document.body
var e = require('vigour-element/e')
var player = require('../lib')
// var toHTML = require('vdom-to-html')
// var test = require('tape')

var app = e({
  DOM: DOM,
  player: e([{
    components: { icon: { text () { return this.parent.key } } },
    config: { apiKey: '9ed67940-5265-468d-98f5-f4638258d3c5' }
  }, player, require('../lib/bitdash')])
})

var Observable = require('vigour-observable')
var Data = new Observable({
  inject: require('vigour-observable/lib/data'),
  Child: 'Constructor'
}).Constructor

app.val = new Data({
  video: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.{type}'
})