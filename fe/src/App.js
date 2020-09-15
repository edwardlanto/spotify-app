import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "./contexts/DataLayer";
import Player from "./components/Player";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import axios from "axios";
import { useCookies } from "react-cookie";
import { audioPlay } from './utils';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "refresh_token",
    "access_token",
  ]);
  const [authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [{ currentPlaylist }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const checkAuth = async () => {
      if (!cookies.access_token || !cookies.refresh_token) {
        setAuthorized(false);
      } else {
        axios.post("/refresh_token", {
          refresh_token: cookies.refresh_token,
        });
        
        setAuthorized(true);
        if(cookies.access_token){
          const user = await axios.get('/spotify/me');
          console.log('user current', user.data);
          setUser(user?.data?.user);
          setPlaylists(user?.data?.playlists);

          dispatch({
            type:"SET_CURRENT_PLAYLIST",
            current_playlist: user?.data.newReleases
          });

        }
      }
    };
    checkAuth();
  }, []);

  return (
    <>
        {authorized === false ? (
          <Login />
        ) : (
          <>
     <div class="app">
      <Header user={user} />
      <Sidebar playlists={playlists} />
      <Router>
        <Player />
        </Router>
        <Footer />
      </div>
      </>
        )}
    </>
  );
}

export default App;
