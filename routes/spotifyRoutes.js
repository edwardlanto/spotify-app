const router = require("express").Router();
const axios = require("axios");

// Intercept every route call
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

// All data in me
router.route("/me").get(async (req, res) => {
  try {
    const me = await axios.get("https://api.spotify.com/v1/me");
    const playlists = await axios.get(
      "https://api.spotify.com/v1/me/playlists"
    );
    const discoverWeekly = await axios.get(
      "https://api.spotify.com/v1/playlists/37i9dQZEVXcIrIaekNWlE1"
    );

    let startData = await Promise.all([me, playlists, discoverWeekly]);
    res.status(200).send({
      user: startData[0].data,
      playlists: startData[1].data,
      current_playlist: startData[2].data,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

router.route("/get_playlist").get(async (req, res) => {
  try {
    const id = req.query.id;
    const data = await axios.get(`https://api.spotify.com/v1/playlists/${id}`);
    console.log("TRACKS", data.data);
    res.status(200).send(data.data);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

router.route("/search").get(async(req, res) => {
  const term = req.query.q;
  try {
    const data = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: term,
        type: "playlist,track",
      },
    })
    res.status(200).send(data.data);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
