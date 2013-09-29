var video = require('./');

before(function (done) {
  document.body.innerHTML = '<div id="player"></div>';
  done();
});

it('plays a youtube video', function(done){
  var options = {
    width: 300,
    height: 180,
    controls: false,
    loop: true,
    autoplay: true,
    onPlay: onPlay,
    onPause: onPause,
    onEnd: onStop
  };

  video('player', 'rfh4Mhp-a6U', options);

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
