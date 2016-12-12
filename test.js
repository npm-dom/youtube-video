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

test('supports all playerVars parameters', function(t){
  var options = {
    autoplay: 1,
    cc_load_policy: 1,
    color: 'white',
    controls: 0,
    disablekb: 1,
    loop: 1,
  }
  t.plan(options.length);

  video('tUsYb6Jkvt8', options, function (error, playback) {
    var src = document.getElementById('youtube-video').getAttribute('src');

    t.notEqual(-1, src.indexOf('autoplay=1'), 'autoplay parameter is supported');
    t.notEqual(-1, src.indexOf('cc_load_policy=1'), 'cc_load_policy parameter is supported');
    t.notEqual(-1, src.indexOf('color=white'), 'color parameter is supported');
    t.notEqual(-1, src.indexOf('controls=0'), 'controls parameter is supported');
    t.notEqual(-1, src.indexOf('disablekb=1'), 'controls parameter is supported');
    t.notEqual(-1, src.indexOf('loop=1'), 'loop parameter is supported');
    t.end()
  });
});

test('supports search list type', function(t){
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
