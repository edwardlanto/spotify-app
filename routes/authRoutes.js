const router = require("express").Router();
const querystring = require("querystring");
const redirect_uri = "http://localhost:8888/callback";
const axios = require("axios");
const _SpotifyWebApi = require("spotify-web-api-node");
const SpotifyWebApi = new _SpotifyWebApi();
const generateRandomString = require("../utils/index");
let state = generateRandomString(64);
let stateKey = "spotify_auth_state";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state"
];

// This access token is to make http requests.
async function getAccessToken({ code }) {
  const token = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "authorization_code",
      redirect_uri,
      code,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("ERR", error);
    });

  // Passing only refresh and access tokens to route
  const dataObj = {};
  const data = token;
  dataObj.access_token = data.data.access_token;
  dataObj.refresh_token = data.data.refresh_token;
  return dataObj;
}

router.route("/login").get((req, res) => {
  try {
    res.cookie(stateKey, state);
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.CLIENT_ID,
          scope: scopes.join("%20"),
          redirect_uri: redirect_uri,
          state: state,
          show_dialog: true,
        })
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/callback").get(async (req, res) => {
  try {
    const code = req.query.code;
    const data = await getAccessToken({ code });
    if (data.access_token) {
      SpotifyWebApi.setAccessToken(data.access_token);
      res.cookie("access_token", data.access_token, { maxAge: 900000 });
      res.cookie("refresh_token", data.refresh_token, { maxAge: 900000 });

      // Get the authenticated user
    }
    res.redirect("http://localhost:3000");
  } catch (err) {
    console.log("err", err);
  }
});

router.route("/refresh_token").post(async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const token = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params: {
        grant_type: "refresh_token",
        refresh_token,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    });

    res.cookie("access_token", token.data.access_token, { maxAge: 900000 });
    res.send({
      access_token: token.data.access_token,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

module.exports = router;
