const router = require("express").Router();
const querystring = require("querystring");
const DEBUG = process.env.NODE_ENV === "development";

// Different URI for environment
const redirect_uri = DEBUG === true ? "http://localhost:5000/callback" : "https://spotify-app-edward-lanto.herokuapp.com/callback"
const axios = require("axios");

// Uses Spotify

const generateRandomString = require("../utils/index");
let state = generateRandomString(64);
let stateKey = "spotify_auth_state";

// Access to resources
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state"
];
const PORT = process.env.PORT || 5000

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
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send(err.message);
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
      res.cookie("access_token", data.access_token, { maxAge: 900000 });
      res.cookie("refresh_token", data.refresh_token, { maxAge: 900000 });
    }
    res.redirect(DEBUG === true ? "http://localhost:3000" : "https://spotify-app-edward-lanto.herokuapp.com/");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.route("/refresh_token").get(async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  if(!req.cookies.refresh_token){
    res.send('what???', 404);
    res.status(500).send({message: "Does not include refresh token"});
  }
  try {
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

    res.cookie("access_token", token.data.access_token, { maxAge: 90000000 });
    res.cookie("refresh_token", req.cookies.refresh_token, { maxAge: 90000000 });
    res.send({
      access_token: token.data.access_token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/logout").get((req, res) => {
  try{
    res.clearCookie("access_token").clearCookie("refresh_token").status(200).send("Logged Out");
  }catch(err){
    res.status(500).send(err);
  }
});

module.exports = router;
