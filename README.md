## youtube-video

Minimalistic API to play Youtube videos

```js
youtubeVideo = require('youtube-video')
youtubeVideo('sl1Q6W0UzGk', {
  elementId: 'foobar',
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

### youtubeVideo(`video-id` or `video-url`, `onReady`)

```js
youtubeVideo('https://www.youtube.com/watch?v=rfh4Mhp-a6U', function (error, playback) {
  playback.playVideo()
})
```

### youtubeVideo(`video-id` or `video-url`, `options`, `onReady`)

```js
youtubeVideo = require('youtube-video')
youtubeVideo('sl1Q6W0UzGk', {
  elementId: 'player', // by default: youtube-video
  width: 640,
  height: 390,
  autoplay: true,
  controls: false,
  onPause: onPause,
  onPlay: onPlay,
  onEnd: onEnd
})
```
