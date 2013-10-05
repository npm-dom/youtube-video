var video = require('./');

it('plays the video at given url', function(done){
  var url = 'http://www.youtube.com/watch?v=tUsYb6Jkvt8&list=PLbpi6ZahtOH5bCaWwhAAn6eUBOtbHl5AV';

  video(url, function (error, playback) {
    expect(playback.getVideoUrl()).to.equal('https://www.youtube.com/watch?feature=player_embedded&v=tUsYb6Jkvt8');
    done();
  });
});

it('plays a youtube video', function(done){
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
    expect(paused).to.be.true;
    done();
  }

});
