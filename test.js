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
