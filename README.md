## youtube-video

Minimalistic API to play Youtube videos

```js
youtubeVideo = require('youtube-video')
youtubeVideo('player', 'sl1Q6W0UzGk', {
  width: 640,
  height: 390,
  autoplay: true,
  controls: false,
  onPaused: function () {}
})
```

## Install

```bash
$ npm install youtube-video
```

## API

### youtubeVideo(`DOM-id`, `video-id`, `options`, `onReady`)

```js
youtubeVideo = require('youtube-video')
youtubeVideo('player', 'sl1Q6W0UzGk', {
  width: 640,
  height: 390,
  autoplay: true,
  controls: false,
  onPaused: function () {}
}, onReady)

function onReady (playback) {
  playback.playVideo()
}
```
