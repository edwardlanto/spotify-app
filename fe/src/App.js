import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "./contexts/DataLayer";
import Player from "./components/Player";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SongList from "./views/SongList";
import Footer from "./components/Footer";
import axios from "axios";
import { useCookies } from 'react-cookie';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['refresh_token', 'access_token']);
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!cookies.access_token) {
        setAuthorized(false);
      } else {
        let checkAuthPromise = await axios.post("/refresh_token", {
          refresh_token: cookies.refresh_token
        });

        console.log('check auth promise', checkAuthPromise)
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      {authorized === false ? (
        <Login />
      ) : (
        <div class="app">
          <>
          cooke {cookies.refresh_token}
            <Header />
            <Sidebar />
            <Player />
            {}
            <Footer />
          </>
        </div>
      )}
    </>
  );
}

export default App;
