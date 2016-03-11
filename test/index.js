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
    components: {
      loader: { text: 'LOADING!' },
      icon: { text () { return this.parent.key } }
    },
    config: {
      ads: {
        0: [
          'http://techslides.com/demos/sample-videos/small.mp4'
        ],
        10: [
          'http://techslides.com/demos/sample-videos/small.mp4',
          'https://cstatic.weborama.fr/advertiser/701/13/73/149/640x360_EtapesVie_SBS_NLBE.mp4'
        ]
      },
      apiKey: '9ed67940-5265-468d-98f5-f4638258d3c5'
    }
  }, player, require('../lib/bitdash'), require('../lib/vast')]),
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

var data = new Data({
  one: {
    video: 'http://akamaivod.tv.ae/5a5ea/LYX00000004_3860_(3860_ISMUSP).ism/LYX00000004_3860_(3860_ISMUSP).{type}',
    progress: 0,
    duration: 1000
  },
  two: {
    progress: 0,
    duration: 1000,
    video: 'https://cstatic.weborama.fr/advertiser/701/13/73/149/640x360_EtapesVie_SBS_NLBE.mp4'
  }
})

app.val = data.one

// setTimeout(function () {
//   app.player.__input = data.two
//   app.player.emit('data')
//   app.player.ad.origin.set(true)
//   app.player.ended.origin.on(function () {
//     app.player.__input = data.one
//     app.player.emit('data')
//     app.player.ad.origin.set(false)
//   })
// }, 4000)
