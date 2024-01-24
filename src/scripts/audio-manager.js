function setupAudio() {

  // background music
  const musicAudio = new Howl({
    src: ['src/assets/music.mp3'],
    autoplay: true,
    loop: true,
  });

  const musicId = musicAudio.play();
  musicAudio.fade(0, 1, 4000, musicId);
  
  }