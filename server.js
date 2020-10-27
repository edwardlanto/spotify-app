const express = require("express"); // Node  framework
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const DEBUG = process.env.NODE_ENV === "development";
const PORT = process.env.PORT || 5000

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Middleware to logging accessed routes
app.use(morgan("dev"));

// Uses cookieParser to pass back access token to UI.
app.use(cookieParser());

// Set production build
if(DEBUG){
  app.use(express.static("fe/public"));
}else{
  app.use(express.static("fe/build"));
}

// All Auth Routes
const authRouter = require("./routes/authRoutes");

// All Spotify Routes
const spotifyRouter = require("./routes/spotifyRoutes");

app.use("/", [authRouter]);
app.use("/spotify", spotifyRouter);
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'fe/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
