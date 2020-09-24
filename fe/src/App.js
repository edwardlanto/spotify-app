import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "./contexts/DataLayer";
import Body from "./components/Body";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import axios from "axios";
import { useCookies } from "react-cookie";
import { audioPlay } from "./utils";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "refresh_token",
    "access_token",
  ]);
  const [authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [{ current_playlist }, dispatch] = useDataLayerValue();

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
          console.log("user current", initialData);
          setUser(initialData?.data?.user);
          setPlaylists(initialData?.data?.playlists);
          dispatch({
            type: "SET_CURRENT_PLAYLIST",
            current_playlist: initialData?.data.current_playlist,
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
            <Body current_playlist={current_playlist} />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
