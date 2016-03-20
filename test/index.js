'use strict'
// var ua = require('vigour-ua/navigator')
// ua.webview = true

var DOM = require('vigour-util/is/node') ? {} : document.body
var e = require('vigour-element/e')
var player = require('../lib')

// var toHTML = require('vdom-to-html')
// var test = require('tape')

var Observable = require('vigour-observable')

var Data = new Observable({
  inject: require('vigour-observable/lib/data'),
  Child: 'Constructor'
}).Constructor

var bunny = new Data({
  key: 'bunny-video-data',
  img: 'https://www.filmfestival.nl/FionaAssets/000001/00000136/scaled/13667.jpg',
  video: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
})

var lego = new Data({
  key: 'lego-video-data',
  video: 'http://techslides.com/demos/sample-videos/small.mp4'
})

var app = global.app = e({
  DOM: DOM,
  player: e([{
    components: {
      loader: { text: 'LOADING!' },
      icon: { text () { return this.parent.key } }
    },
    config: {
      ads: {
        '0': [
          'http://ads.adhese.be/ad3ad/sl_vier.be_-midroll/rn5707/pr1/re0068007400740070003a002f002f003100390032002e003100360038002e0031002e00320037003a0038003000380036002f003f002400690064003d006d00610063002d006400650073006b0074006f0070002d006300680072006f006d0065002d0038003800300026002400660069006c0065003d002f006500780061006d0070006c0065002f006100640073002f00620061006e006e006500720073002f006100640068006500730065002e006a0073002600240061006300740069006f006e003d006400650076/ur0068007400740070003a002f002f003100390032002e003100360038002e0031002e00320037003a0038003000380036002f003f002400690064003d006d00610063002d006400650073006b0074006f0070002d006300680072006f006d0065002d0038003800300026002400660069006c0065003d002f006500780061006d0070006c0065002f006100640073002f00620061006e006e006500720073002f006100640068006500730065002e006a0073002600240061006300740069006f006e003d006400650076/brChrome;Chrome47;OSX;desktop/dtdesktop/inrbcn;prx/?t=' + new Date().getTime()
          // 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000)
        ],
        '0.1': [
          'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000)
        ]
      },
      apiKey: '9ed67940-5265-468d-98f5-f4638258d3c5'
    }
  }, player
  // order is important ==> add to docs!
  , require('../lib/bitdash')
  , require('../lib/controls')
  , require('../lib/ad/vast')
  ]),
  title: {
    text: {
      val: 'VIDEO PLAYING',
      $playerAd: 'AD PLAYING'
    }
  },
  button: {
    type: 'button',
    text: 'switch src',
    on: {
      click () {
        // app.val = lego
        app.val = app.__input === bunny ? lego : bunny
      }
    }
  }
})

app.val = bunny

