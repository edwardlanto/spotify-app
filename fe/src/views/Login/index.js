import React from "react";
import "./index.css";
const DEBUG = process.env.NODE_ENV === "development";
function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="logo"
        />
        {/* // Spotify Logo
            
            // Login Button */}
        <a href={ DEBUG ? 'http://localhost:5000/login' : 'https://spotify-app-edward-lanto.herokuapp.com/login'}>Login with Spotify</a>
      </div>
    </div>
  );
}

export default Login;
