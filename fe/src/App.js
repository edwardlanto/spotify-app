import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./contexts/DataLayer";
import Player from "./components/Player";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SongList from "./views/SongList";
import Footer from "./components/Footer";
import { getTokenFromResponse } from './spotify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {

  }, []);

  function tokenCallBack(){
    const hash = getTokenFromResponse();
    localStorage.setItem('code', hash['code']);
      axios.get('/callback', {
        params:{
          code:hash
        }
      })
  }

  return (
    <Router>
      <Header />
      <Sidebar />
      <div className="app">
        <Route exact path="/login" render={() => <Login />} />
        <Switch>
          <Route exact path="/" render={() =>  authToken !== null ? <Login /> : <div>HOME</div>  } />
          <Route exact path="/callback" render={() =>  tokenCallBack()  } />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
