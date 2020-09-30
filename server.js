"use strict";

const express = require("express"); // Express web server framework
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const DEBUG = process.env.NODE_ENV === "development";

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(__dirname + "/fe/public"));

// Routes
const authRouter = require("./routes/authRoutes");
const spotifyRouter = require("./routes/spotifyRoutes");

app.use("/", [authRouter]);
app.use("/spotify", spotifyRouter);

console.log("Listening on 8888");
app.listen(8888);
