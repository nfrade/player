'use strict'
// var ua = require('vigour-ua/navigator')
// ua.webview = true

var DOM = require('vigour-util/is/node') ? {} : document.body
var e = require('vigour-element/e')
var player = require('../lib')

// var toHTML = require('vdom-to-html')
// var test = require('tape')

var app = global.app = e({
  DOM: DOM,
  player: e([{
    components: {
      loader: { text: 'LOADING!' },
      icon: { text () { return this.parent.key } }
    },
    config: {
      ads: {
        0: [ 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000) ],
      },
      apiKey: '9ed67940-5265-468d-98f5-f4638258d3c5'
    }
  }, player
  , require('../lib/bitdash')
  , require('../lib/ad/vast')
  , require('../lib/controls')
  ]),
  title: {
    text: {
      val: 'VIDEO PLAYING',
      $playerAd: 'AD PLAYING'
    }
  }
})

var Observable = require('vigour-observable')

var Data = new Observable({
  inject: require('vigour-observable/lib/data'),
  Child: 'Constructor'
}).Constructor

app.val = new Data({
  img: 'http://www.helpinghomelesscats.com/images/cat1.jpg',
  video: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
})

