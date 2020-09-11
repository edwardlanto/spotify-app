/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
var cors = require("cors");
var morgan = require("morgan");
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var hostUrl = "http://localhost:8888/callback";
var authorizationCode = "";
require("dotenv").config();

// Privileges to Spotify API
var scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-modify-playback-state",
];

var redirect_uri = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${hostUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

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
    // your application requests authorization
    var scope = "user-read-private user-read-email user-read-playback-state";
    // res.redirect(`https://accounts.spotify.com/authorize?client_id=6ed448c826ef40c7a7acc8bf7447556b&response_type=code&
    // redirect_uri=http://localhost:8888/callback&scope=user-read-private%20user-read-email&state=${state}`)

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: "6ed448c826ef40c7a7acc8bf7447556b",
          scope: scopes.join("%20"),
          redirect_uri: "http://localhost:8888/callback",
          state: state,
          show_dialog: true,
        })
    );

    console.log("clientid", client_id);
  } catch (err) {
    console.log("err", err);
  }
});

async function getAccessToken({ code }) {
  let json = JSON.stringify({
    code: code,
    redirect_uri: "http://localhost:3000",
    grant_type: "authorization_code",
  });
  const encoded = window.btoa(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET.toString("base64")}`
  );
  const req = fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: json,
    headers: { Authorization: encoded },
  });
  const text = await request.text();
  const params = new URLSearchParams(text);
  return params.get("access_token");
}

app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const state = req.query.state;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
      const access_token = await getAccessToken({ code });
      console.log("access token", access_token);

    console.log("state", state);
  } catch (err) {
    res.send(err);
    console.log("err", err);
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
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
