import React, { useEffect, useState, useContext } from "react";
import Body from "./components/Body";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Search from "./views/Search"
import axios from "axios";
import { useCookies } from "react-cookie";
import { store } from "./store";
import Spotify from 'spotify-web-api-js';
let spotify = new Spotify();

function App() {
  const globalState = useContext(store);
  const [cookies, setCookie, removeCookie] = useCookies([
    "refresh_token",
    "access_token",
  ]);
  const [authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(() => globalState.state.currently_playing);
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
          const initialData = await axios.get("/spotify/me");
          setUser(initialData?.data?.user);
          setPlaylists(initialData?.data?.playlists);
          console.log("PLAYLIST", initialData?.data?.playlists);
          dispatch({
            type: "SET_CURRENT_PLAYLIST",
            current_playlist: initialData?.data.current_playlist,
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
    <Router>
    <>
      {authorized === false ? (
        <Login />
      ) : (
        <>  
          <div className="app">
            <Header user={user} />
            <Sidebar playlists={playlists} />
            <Switch>
              <Route path="/" exact component={Body} />
              <Route path="/search" exact component={Search} />
              </Switch>
            <Footer />
          </div>
        </>
      )}
    </>
    </Router>
  );
}

export default App;
