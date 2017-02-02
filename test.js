var video = require('./');
var test = require('tape')

test('plays the video at given url', function(t){
  var url = 'http://www.youtube.com/watch?v=tUsYb6Jkvt8&list=PLbpi6ZahtOH5bCaWwhAAn6eUBOtbHl5AV';
  t.plan(1)

  video(url, function (error, playback) {
    t.equal(playback.getVideoUrl(), 'https://www.youtube.com/watch?v=tUsYb6Jkvt8');
    t.end()
  });
});

test('plays the playlist at given url', function(t){
  var url = 'https://www.youtube.com/playlist?list=PLwlF1uffYtXo08VWYny-lVJ89niu4KIdm';
  t.plan(1)

  video(url, function (error, playback) {
    t.equal(playback.getPlaylistId(), 'PLwlF1uffYtXo08VWYny-lVJ89niu4KIdm');
    t.end()
  });
});

test('plays a youtube video', function(t){
  var options = {
    width: 300,
    height: 180,
    controls: false,
    autoplay: true,
    onPlay: onPlay,
    onPause: onPause,
    onEnd: onStop
  };

  video('rfh4Mhp-a6U', options);

  var paused;

  function onPause (player) {
    paused = true;
    player.playVideo();
  }

  function onPlay (player) {
    if (paused) return;
    setTimeout(function (){
      player.pauseVideo();
    }, 1000);
  }

  function onStop () {
    t.ok(paused)
    t.end();
  }
});

test('supports all playerVars parameters', function(t) {
  var options = {
    autoplay: 1,
    cc_load_policy: 1,
    color: 'white',
    controls: 0,
    disablekb: 1,
    end: 1,
    fs: 1,
    hl: 'en',
    iv_load_policy: 1,
    loop: 1,
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
    start: 5
  }
  t.plan(options.length);

  video('tUsYb6Jkvt8', options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('autoplay=1'), 'autoplay parameter is supported');
    t.notEqual(-1, src.indexOf('cc_load_policy=1'), 'cc_load_policy parameter is supported');
    t.notEqual(-1, src.indexOf('color=white'), 'color parameter is supported');
    t.notEqual(-1, src.indexOf('controls=0'), 'controls parameter is supported');
    t.notEqual(-1, src.indexOf('disablekb=1'), 'disablekb parameter is supported');
    t.notEqual(-1, src.indexOf('end=1'), 'end parameter is supported');
    t.notEqual(-1, src.indexOf('fs=1'), 'fs parameter is supported');
    t.notEqual(-1, src.indexOf('hl=en'), 'hl parameter is supported');
    t.notEqual(-1, src.indexOf('iv_load_policy=1'), 'iv_load_policy parameter is supported');
    t.notEqual(-1, src.indexOf('loop=1'), 'loop parameter is supported');
    t.notEqual(-1, src.indexOf('modestbranding=1'), 'modestbranding parameter is supported');
    t.notEqual(-1, src.indexOf('playsinline=1'), 'playsinline parameter is supported');
    t.notEqual(-1, src.indexOf('rel=0'), 'rel parameter is supported');
    t.notEqual(-1, src.indexOf('showinfo=0'), 'showinfo parameter is supported');
    t.notEqual(-1, src.indexOf('start=5'), 'start parameter is supported');
    t.end()
  });
});

test('supports search list type', function(t) {
  var options = {
    list: 'cats',
    listType: 'search',
  }
  t.plan(3);

  video(null, options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('list=cats'), 'search terms are supported');
    t.notEqual(-1, src.indexOf('listType=search'), 'search playlists are supported');
    t.ok(playback.getPlaylist(), 'YouTube has cat videos');
    t.end()
  });
});

test('supports playlist list type', function(t) {
  var options = {
    list: 'PLwlF1uffYtXo08VWYny-lVJ89niu4KIdm',
    listType: 'playlist',
  }
  t.plan(3);

  video(null, options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('list=PLwlF1uffYtXo08VWYny-lVJ89niu4KIdm'), 'playlist IDs are supported');
    t.notEqual(-1, src.indexOf('listType=playlist'), 'playlists are supported');
    t.ok(playback.getPlaylist(), 'YouTube has playlists of cute cat videos');
    t.end()
  });
});

test('supports user_uploads list type', function(t) {
  var options = {
    list: 'UC9egiwuJsQZ0Cy2to5fvSIQ',
    listType: 'user_uploads',
  }
  t.plan(3);

  video(null, options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('list=UC9egiwuJsQZ0Cy2to5fvSIQ'), 'user upload list IDs are supported');
    t.notEqual(-1, src.indexOf('listType=user_uploads'), 'user upload playlists are supported');
    t.ok(playback.getPlaylist(), 'YouTube has a whole channel of cat videos');
    t.end()
  });
});

test('casts boolean playerVars as integers', function(t) {
  var options = {
    autoplay: true,
    controls: false,
    loop: true,
  }
  t.plan(3);

  video('tUsYb6Jkvt8', options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('autoplay=1'), 'autoplay parameter is being cast as an integer');
    t.notEqual(-1, src.indexOf('controls=0'), 'controls parameter is being cast as an integer');
    t.notEqual(-1, src.indexOf('loop=1'), 'loop parameter is being cast as an integer');
    t.end()
  });
});

test('accepts and merges a playerVars option', function(t) {
  var options = {
    autoplay: 1,
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  }
  t.plan(2);

  video('tUsYb6Jkvt8', options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('autoplay=0'), 'autoplay is being overridden by playerVars.autoplay');
    t.notEqual(-1, src.indexOf('controls=0'), 'controls parameter is being recognized');
    t.end()
  });
});

test('respects the elementId argument', function(t) {
  var player = document.createElement('div');
  player.id = 'test-player';
  document.body.appendChild(player);

  t.plan(1);

  video('tUsYb6Jkvt8', {elementId: 'test-player'}, function (error, playback) {
    t.equal('test-player', playback.getIframe().id, 'elementId is being set');
    t.end();
  });
});
