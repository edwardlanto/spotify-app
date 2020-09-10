import React, { useEffect, useState } from "react";
import Login from "./views/Login/";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./contexts/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [{}, dispatch] = useDataLayerValue;
  useEffect(() => {
    const hash = getTokenFromUrl();
    console.log("hash", hash.access_token);
    const _token = hash.access_token;
    console.log("token", token);
    console.log("token", _token);

    if (_token) {
      setToken(_token);

      // Authorize spotify instance with token
      spotify.setAccessToken(_token);

      spotify.getMe().then((res) => {
        console.log("res", res);
      });
    }

    window.location.hash = "";
  });

  return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
