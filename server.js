"use strict";

const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser'); 
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/fe/public"));


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

// Route Middleware

app.use((req, res, next) => {
  
})

// Routes
const homeRouter = require('./routes/homeRoutes');
const authRouter = require('./routes/authRoutes');

app.use('/', [authRouter]);

console.log("Listening on 8888");
app.listen(8888);
