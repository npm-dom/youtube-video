var sdk = require('require-sdk')('https://www.youtube.com/iframe_api', 'YT');
var loadTrigger = sdk.trigger();

window.onYouTubeIframeAPIReady = function () {
  loadTrigger();
  delete window.onYouTubeIframeAPIReady;
};

module.exports = play;

function play (selector, id, options, callback) {
  var player;
  var api;

  sdk(function (error, youtube) {
    api = youtube;

    player = new api.Player(selector, {
      height: options.height,
      width: options.width,
      playerVars: {
        autoplay: options.autoplay ? 1 : 0,
        controls: options.controls ? 1 : 0,
        loop: options.loop ? 1 : 0
      },
      videoId: id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  });

  function onPlayerReady (event) {
    callback && callback(undefined, event.target);
  }

  function onPlayerStateChange (event) {
    if (event.data == api.PlayerState.PLAYING && options.onPlay) {
      options.onPlay(event.target);
    }

    if (event.data == api.PlayerState.ENDED && options.onEnd) {
      options.onEnd(event.target);
    }

    if (event.data == api.PlayerState.PAUSED && options.onPause) {
      options.onPause(event.target);
    }
  }

}
