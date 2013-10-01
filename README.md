## youtube-video

Minimalistic API to play Youtube videos

```js
youtubeVideo = require('youtube-video')
youtubeVideo('player', 'sl1Q6W0UzGk', {
  width: 640,
  height: 390,
  autoplay: true,
  controls: false,
  onPlay: onPlay,
  onEnd: onEnd,
  onPause: onPause
})
```

* Demo: http://requirebin.com/embed?gist=6774318
* Source code: http://requirebin.com/?gist=6774318

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
  onPause: onPause,
  onPlay: onPlay,
  onEnd: onEnd
}, onReady)

function onReady (playback) {
  playback.playVideo()
}
```
