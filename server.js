"use strict";

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
var cors = require("cors");
var morgan = require("morgan");
var redirect_uri = 'http://localhost:8888/callback';
const axios = require('axios');
require("dotenv").config();

// Privileges to Spotify API
var scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-modify-playback-state",
];


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let stateKey = "spotify_auth_state";

var app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/fe/public")).use(cookieParser());

app.get("/login", function (req, res) {
  try {
    var state = generateRandomString(64);
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
    console.log("err", err);
  }
});

async function getAccessToken({ code }) {

  const buff = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET.toString("base64"))
  const jsonReq = JSON.stringify();
  console.log("2222JSON REQ", jsonReq);

  const token =  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: "authorization_code",
      redirect_uri,
      code
    },
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    }
  }).then(function(response) {
      console.log(response);
  }).catch(function(error) {
    console.log("ERR", error)
  });
  return token;
}

app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const state = req.query.state;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    const access_token = await getAccessToken({ code });

    console.log("access_token", access_token);
  } catch (err) {
    console.log('err', err);
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",

    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

app.post("/post_token", (req, res) => {
  authorizationCode = req.body.token;
  res.redirect("http://localhost:3000/");
});

// Setting Routes
app.get("/*", (req, res, next) => {
  if (authorizationCode === "") {
    res.redirect("http://localhost:3000/login");
  }
});

console.log("Listening on 8888");
app.listen(8888);
