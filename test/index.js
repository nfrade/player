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
    config: { apiKey: '9ed67940-5265-468d-98f5-f4638258d3c5' },
  }, player, require('../lib/bitdash')])
})

var Observable = require('vigour-observable')

var Data = new Observable({
  inject: require('vigour-observable/lib/data'),
  Child: 'Constructor'
}).Constructor

// http://akamaivod.tv.ae/42c89/LYX00000007_3848_(3848_ISMUSP).ism/LYX00000007_3848_(3848_ISMUSP)
// http://akamaivod.tv.ae/6236c/LYX00000009_3846_(3846_ISMUSP).ism/LYX00000009_3846_(3846_ISMUSP)
// http://akamaivod.tv.ae/5a5ea/LYX00000004_3860_(3860_ISMUSP).ism/LYX00000004_3860_(3860_ISMUSP)

var data = new Data({
  one: {
    video: 'http://akamaivod.tv.ae/5a5ea/LYX00000004_3860_(3860_ISMUSP).ism/LYX00000004_3860_(3860_ISMUSP).{type}',
    // video: 'http://cdn.flowplayer.org/202777/84049-bauhaus.{type}',
    progress: 0,
    duration: 1000
    // video: 'https://cstatic.weborama.fr/advertiser/701/13/73/149/640x360_EtapesVie_SBS_NLBE.mp4'
  },
  two: {
    // video: 'http://akamaivod.tv.ae/6236c/LYX00000009_3846_(3846_ISMUSP).ism/LYX00000009_3846_(3846_ISMUSP).{type}',
    // video: 'http://akamaivod.tv.ae/5a5ea/LYX00000004_3860_(3860_ISMUSP).ism/LYX00000004_3860_(3860_ISMUSP).{type}',
    // video: 'http://cdn.flowplayer.org/202777/84049-bauhaus.{type}',
    progress: 0,
    duration: 1000,
    video: 'https://cstatic.weborama.fr/advertiser/701/13/73/149/640x360_EtapesVie_SBS_NLBE.mp4'
  }
})

app.val = data.one

setTimeout(function () {
  app.player.__input = data.two
  app.player.emit('data')
}, 4000)
