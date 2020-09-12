"use strict";

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cors = require("cors");
var morgan = require("morgan");
var redirect_uri = 'http://localhost:8888/callback';
const axios = require('axios');
const _SpotifyWebApi = require('spotify-web-api-node');
const SpotifyWebApi = new _SpotifyWebApi();
var cookieParser = require('cookie-parser'); 
require("dotenv").config();

// Privileges to Spotify API
var scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-modify-playback-state",
];

// Generates a state params to pass to spotify API
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
app.use(express.static(__dirname + "/fe/public"));
app.use(cookieParser()) 
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

// This access token is to make http requests.
async function getAccessToken({ code }) {
  const token =  await axios({
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
      return response;
  }).catch(function(error) {
    console.log("ERR", error)
  });
  
  // Passing only refresh and access tokens to route
  const dataObj = {}
  const data =  token;
  dataObj.access_token = data.data.access_token;
  dataObj.refresh_token = data.data.refresh_token;
  return dataObj;

}

app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const data = await getAccessToken({ code });
    console.log('ACCCESS', data.access_token);
    if(data.access_token){
      SpotifyWebApi.setAccessToken(data.access_token);
      res.cookie('access_token', data.access_token, { maxAge: 900000 });
      res.status(200)
      // Get the authenticated user
      const user = await SpotifyWebApi.getMe();
      console.log('USER1', user);
     
      console.log("ACCESS TOKEN", data.access_token);
    }

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

// Setting Routes
app.get("/auth", (req, res, next) => {
  res.send('success');
});

console.log("Listening on 8888");
app.listen(8888);
