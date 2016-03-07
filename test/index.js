'use strict'
var ua = require('vigour-ua/navigator')
ua.webview = true

var DOM = require('vigour-util/is/node') ? {} : document.body
var test = require('tape')
var e = require('vigour-element/e')
var toHTML = require('vdom-to-html')
var player = require('../lib')

test('children and text', function (t) {
  t.plan(1)
  var app = e({
    DOM: DOM,
    player: e([player, {
      config: {
        apiKey: '9ed67940-5265-468d-98f5-f4638258d3c5'
      }
    }])
  })
  t.equal(
    toHTML(app.renderTree),
    '<div><div class="child"><div class="child">text</div></div></div>'
  )
})