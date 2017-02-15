var extend = require('extend');
var newElement = require('new-element');
var sdk = require('require-sdk')('https://www.youtube.com/iframe_api', 'YT');
var loadTrigger = sdk.trigger();

window.onYouTubeIframeAPIReady = function () {
  loadTrigger();
  delete window.onYouTubeIframeAPIReady;
};

module.exports = play;

function play (input, options, callback) {
  var player;
  var api;

  if (arguments.length == 2 && typeof options == 'function') {
    callback = options;
    options = {};
  }

  var elementId = options.elementId || defaultElementId();

  sdk(function (error, youtube) {
    var videoId = pickID(input),
      playerVars = {},
      playlist;

    api = youtube;

    // Assemble the playerVars object using the passed options (except top-level items).
    extend(playerVars, options, options.playerVars);
    delete playerVars.width;
    delete playerVars.height;
    delete playerVars.playerVars;

    // If we don't have a video ID, check to see if `input` is a playlist.
    if (!videoId) {
      playlist = /(?:\?|&)list=([^&]+)/.exec(input);

      if (playlist) {
        playerVars.listType = playerVars.listType || 'playlist';
        playerVars.list = playlist[1];
      }
    }

    // Automatically cast any boolean values as integers.
    for (var i in playerVars) {
      if ('boolean' === typeof playerVars[i]) {
        playerVars[i] = playerVars[i] ? 1 : 0;
      }
    }

    player = new api.Player(
      elementId,
      {
        height: options.height,
        width: options.width,
        playerVars: playerVars,
        videoId: videoId,
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

/**
 * Parse the video ID out of a string.
 *
 * @param {string} input - The input string, which could be a URL or a video ID.
 * @returns {string|null} Either the parsed video ID or NULL.
 */
function pickID (input) {
  var videoId;

  // Return early if there's no ".", as it's clearly not a URL.
  if (!/\./.test(input)) {
    return input;
  }

  videoId = /(?:\?|&)v=([^&]+)/.exec(input);

  return videoId ? videoId[1] : null;
}

function defaultElementId () {
  var id = 'youtube-video';
  var defaultEl = document.getElementById(id);

  if (defaultEl) {
    defaultEl.parentNode.removeChild(defaultEl);
  }

  defaultEl = newElement('<div id="{id}"></div>', { id: id });
  document.documentElement.appendChild(defaultEl);
  return id;
}
