
class SpotifyInstance {
    constructor() {
      if (SpotifyInstance.instance == null) {
        this.audio = new Audio()
        SpotifyInstance.instance = this
      }
      return SpotifyInstance.instance
    }
  
    play(uri) {
      this.audio.src = uri;
      this.audio.play();
    }
  }
  
  const spotify = new SpotifyInstance()
  Object.freeze(spotify)
  export default spotify