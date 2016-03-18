# player

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-player.svg)](https://badge.fury.io/js/vigour-player)

An player wrapper for usage with [vigour-element](https://github.com/vigour-io/element).

## how to use
`npm i --save vigour-player`

Add the player to your app as a component and add your configuration.

Control the player by manipulating the attached state (or just inject the ui controls).

##setup

```js
var e = require('vigour-element')
var player = require('vigour-player')

// define some data
var Observable = require('vigour-observable')
var Data = new Observable({
  inject: require('vigour-observable/lib/data'),
  Child: 'Constructor'
}).Constructor

// it expects a "video" field which will contain the video url (mpd, hls or mp4. Use .{type} for generic url.
var playerData = new Data({
	video: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
})

// some configuration
player.config = {
	apiKey: apiKey,
}

// add some injectables eg. our default controls
player.inject.push(require('vigour-player/lib/controls'))

// add player component to your app
var app = e({
  components: {
    player: player
  },
  DOM: document.body
})

// add your player
app.set({
  myPlayer: {
    type: 'player'
  }
})

// add data to app
app.val = playerData
```

##configuring ads
```js
// inject a protocol (currently only vast is included)
player.inject.push(require('vigour-player/lib/ad/vast'))

// configure your ads, for any given point in the video timeline
player.config.ads = {
	'0': [vasturlA],
	'0.5': [vasturlB, vasturlB]
}
```
