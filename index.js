var extend = require('extend');
var findall = require("findall");
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

  var elementId = options.selector ? options.elementId : defaultElementId();

  sdk(function (error, youtube) {
    var playerVars = {};

    api = youtube;

    // Assemble the playerVars object using the passed options (except top-level items).
    extend(playerVars, options);
    delete playerVars.width;
    delete playerVars.height;

    player = new api.Player(
      elementId,
      {
        height: options.height,
        width: options.width,
        playerVars: playerVars,
        videoId: pickID(input),
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

function pickID (input) {
  if (!/\./.test(input)) return input;

  var match = findall(input, /(?:\?|&)v=([^&]+)/);

  if (match) return match[0];
}

/**
 * Check that a value is within the acceptable values for the given parameter.
 * @type {string} param - The parameter name.
 * @type {mixed}  val   - The value the user has provided.
 * @return {mixed} The passed value if it's permitted or NULL otherwise.
 */
function getEnumeratedValue(param, val) {
  var enumeratedValues = {
    color: ['red', 'white'],
    listType: ['search', 'user_uploads', 'playlist'],
  };

  if (!enumeratedValues.hasOwnProperty(param)) {
    return val;
  }

  return -1 !== enumeratedValues[param].indexOf(val) ? val : null;
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
