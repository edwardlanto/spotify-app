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
    console.log("PLAYED", track);
    this.audio.src = track.preview_url;
    this.audio.play();
    this.audio["is_playing"] = true;
  }

  pause() {
    this.audio.pause();
    this.audio["is_playing"] = false;
  }
}

const spotify = new SpotifyInstance();
Object.freeze(spotify);
export default spotify;
