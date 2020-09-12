import React from 'react';
import './index.css';

function Login(){
    return(
        <div class="login">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="logo"/>
            {/* // Spotify Logo
            // Login Button */}
            <a href="http://localhost:8888/login">Login with Spotify</a>
        </div>
    )
}

export default Login;