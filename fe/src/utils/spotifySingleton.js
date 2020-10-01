
class SpotifyInstance {
    constructor() {
      if (SpotifyInstance.instance == null) {
        this.audio = new Audio();
        this.track = null;
        SpotifyInstance.instance = this

      }
      return SpotifyInstance.instance
    }

    set defaultLocation(track) {
        alert('ran')
        this.track = track;
    }
  
    play(track) {
      this.audio.src = track.preview_url;
      this.audio.play();
      this.audio['is_playing'] = true;
      this.audio['currently_playing'] = track;
    }

    pause(){
        this.audio.pause();
        this.audio['is_playing'] = false;
    }


  }
  
  const spotify = new SpotifyInstance()
  Object.freeze(spotify)
  export default spotify