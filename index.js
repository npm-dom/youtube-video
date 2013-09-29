var loadScript = require("load-script");
var sdkLoadQueue = require('pubsub')();
var isSDKLoading = false;
var isSDKLoaded = false;

loadSDK();

module.exports = play;

function loadSDK (callback) {
  if (isSDKLoaded) {
    return callback && callback();
  }

  callback && sdkLoadQueue(callback);

  if (isSDKLoading) return;

  isSDKLoading = true;

  loadScript('https://www.youtube.com/iframe_api');

  window.onYouTubeIframeAPIReady = function() {
    isSDKLoaded = true;
    sdkLoadQueue.publish();
    delete window.onYouTubeIframeAPIReady;
  }
}

function play (selector, id, options, callback) {
  var player;

  loadSDK(function () {
    player = new YT.Player(selector, {
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
    if (event.data == YT.PlayerState.PLAYING && options.onPlay) {
      options.onPlay(event.target);
    }

    if (event.data == YT.PlayerState.ENDED && options.onEnd) {
      options.onEnd(event.target);
    }

    if (event.data == YT.PlayerState.PAUSED && options.onPause) {
      options.onPause(event.target);
    }
  }

}
