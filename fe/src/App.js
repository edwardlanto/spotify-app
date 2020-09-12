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
import axios from 'axios';
import { getTokenFromResponse } from "./spotify";
import { checkAuth } from "./util/helpers";

function App() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios.get("/").then(() => {
 
    });
  }, []);

  return (
    <div class="app">
      {!authorized ? (
        <Login />
      ) : (
        <>
          <Header />
          <Sidebar />
          <Player />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
