const router = require("express").Router();
const axios = require("axios");

router.route("/*").get(async (req, res, next) => {
  try {
    console.log("Intercepted");
    const host = req.headers;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${req.cookies.access_token}`;
    next();
  } catch (err) {
    console.log("err in interceptor", err);
  }
});

router.route("/me").get(async (req, res) => {
  try {
    const user = await axios.get("https://api.spotify.com/v1/me");
    const playlists = await axios.get(
      "https://api.spotify.com/v1/me/playlists"
    );

    let newReleases = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases"
    ).then(res => {
        const albums = res.data.albums.items.filter(item => {
            return item.album_type = "single"
        })

        return albums
        
    })

    const currentlyPlaying = await axios.get('https://api.spotify.com/v1/me/player/currently-playing');

    res.status(200).send({
      user: user.data,
      playlists: playlists.data,
      current_playlist: newReleases,
      currently_playing: currentlyPlaying.data
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

// router.route("/current").get(async (req, res) => {
//   try {
//     const currentSong = await axios.get(
//       "https://api.spotify.com/v1/me/player/currently-playing"
//     );
//     res.status(200).send(currentSong);
//   } catch (err) {
//       consol
//     res.status(500).send(err);
//   }
// });

module.exports = router;
