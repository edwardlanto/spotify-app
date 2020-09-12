"use strict";

const express = require("express"); // Express web server framework
const app = express();
const request = require("request"); // "Request" library
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(__dirname + "/fe/public"));

// Routes
const homeRouter = require("./routes/homeRoutes");
const authRouter = require("./routes/authRoutes");
const meRouter = require("./routes/meRoutes");

app.use("/", [authRouter]);
app.use("/me", [meRouter]);

console.log("Listening on 8888");
app.listen(8888);
