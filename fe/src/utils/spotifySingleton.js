class SpotifyInstance {
  constructor() {
    this.audio = new Audio();
    this.track = null;
    if (SpotifyInstance.instance == null) {
      SpotifyInstance.instance = this;
    }
    return SpotifyInstance.instance;
  }

  play(track) {
    this.audio.src = track.preview_url;
    this.audio.play();
    this.audio["is_playing"] = true;
  }

  pause() {
    this.audio.pause();
    this.audio["is_playing"] = false;
  }

  setVolume(vol) {
    this.audio.volume = vol / 100;
  }
}

const spotify = new SpotifyInstance();
Object.freeze(spotify);
export default spotify;
