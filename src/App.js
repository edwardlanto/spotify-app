import React, { useEffect, useState } from "react";
import Login from "./views/Login/";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./contexts/DataLayer";
import './index.css';

const spotify = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState(null);
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    console.log("hash", hash.access_token);
    const _token = hash.access_token;
    console.log("token", _token);

    if (_token) {
      // setToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      // Authorize spotify instance with token
      spotify.setAccessToken(_token);
  

      spotify.getMe().then((user) => {
        return dispatch({
          type: "SET_USER",
          user
        });

      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log('playlist', playlists);
        dispatch({
          type:'SET_PLAYLISTS',
          playlists:playlists.items
        })
      })
    }
  }, []);

  return (
    <div className="app">
      {token  ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
