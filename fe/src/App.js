import React, { useEffect, useState, useContext } from "react";
import Body from "./components/Body";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import axios from "axios";
import { useCookies } from "react-cookie";
import { store } from "./store";
import Spotify from 'spotify-web-api-js';
let spotify = new Spotify();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "refresh_token",
    "access_token",
  ]);
  const [authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying ] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    const checkAuth = async () => {
      if (!cookies.access_token || !cookies.refresh_token) {
        setAuthorized(false);
      } else {
        axios.post("/refresh_token", {
          refresh_token: cookies.refresh_token,
        });
        setAuthorized(true);
        if (cookies.access_token) {
          spotify.setAccessToken(cookies.access_token);
          const device_id = spotify.getMyDevices().then(res => res);
          console.log('token', device_id);
          const initialData = await axios.get("/spotify/me");
          setUser(initialData?.data?.user);
          setPlaylists(initialData?.data?.playlists);
          setCurrentlyPlaying(initialData?.data.current_playing)
          console.log('Current DAT', initialData?.data.current_playing)
          dispatch({
            type: "SET_CURRENT_PLAYLIST",
            discover_weekly: initialData?.data.discover_weekly,
          });

          dispatch({
            type: "SET_SPOTIFY",
            spotify
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
            <div className="padding-block"></div>
            <Body />
            <Footer currently_playing={currentlyPlaying} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
