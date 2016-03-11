'use strict'
// var DMVAST = require('vast-client')
function isVideo (val) {
  return /\.((hls)|(mp4)|(mpd))$/i.test(val)
}


module.exports = function injectVast (player) {
  let load = player.load
  let init = player.init
  player.define({
    init: function (src) {
      // if (!isVideo(src)) {
      //   setTimeout(() => init.call(this, src), 1000)
      // } else {
        init.call(this, src)
      // }
    },
    load: function (src) {
      // if (!isVideo(src)) {
      //   setTimeout(() => load.call(this, src), 1000)
      // } else {
        load.call(this, src)
      // }
    }
  })
}

// console.log('DMVAST', DMVAST)

// var VASTURL = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000)

// // var VASTURL = 'http://ads.adhese.be/ad3ad/sl_vier.be_hetbestemoetnogkomen_-preroll/rn5707/pr1/re0068007400740070003a002f002f003100390032002e003100360038002e0031002e00320037003a0038003000380036002f003f002400690064003d006d00610063002d006400650073006b0074006f0070002d006300680072006f006d0065002d0038003800300026002400660069006c0065003d002f006500780061006d0070006c0065002f006100640073002f00620061006e006e006500720073002f006100640068006500730065002e006a0073002600240061006300740069006f006e003d006400650076/ur0068007400740070003a002f002f003100390032002e003100360038002e0031002e00320037003a0038003000380036002f003f002400690064003d006d00610063002d006400650073006b0074006f0070002d006300680072006f006d0065002d0038003800300026002400660069006c0065003d002f006500780061006d0070006c0065002f006100640073002f00620061006e006e006500720073002f006100640068006500730065002e006a0073002600240061006300740069006f006e003d006400650076/brChrome;Chrome47;OSX;desktop/dtdesktop/inrbcn;prx/?t=' + new Date().getTime()

// DMVAST.client.get(VASTURL, function(res) {
//   if (res) {
//     console.info('response!', res)
//     let ads = res.ads
//     let i = ads.length - 1
//     for (; i >= 0; i--) {
//       let ad = ads[i]
//       let creatives = ad.creatives
//       let j = creatives.length - 1
//       for (; j >= 0; j--) {
//         let creative = creatives[j]
//         if (creative.type === 'linear') {
//           let files = creative.mediaFiles
//           let k = files.length - 1
//           for (; k >= 0; k--) {
//             let media = files[k]
//             if (media.mimeType === 'video/mp4') {
//               let src = media.fileURL
//               console.info('- -ad src:', src)
//               // do something with this src
//               // player.vastTracker = new DMVAST.tracker(ad, creative);
//               // player.vastTracker.on('clickthrough', function(url)
//               // {
//               //     document.location.href = url;
//               // });
//               // player.on('canplay', function() {this.vastTracker.load();});
//               // player.on('timeupdate', function() {this.vastTracker.setProgress(this.currentTime);});
//               // player.on('play', function() {this.vastTracker.setPaused(false);});
//               // player.on('pause', function() {this.vastTracker.setPaused(true);});
//             }
//           }
//         }
//       }
//     }
//   } else {
//     console.info('no response lets do something else')
//   }
// })
