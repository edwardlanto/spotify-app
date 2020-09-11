import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue  } from "./contexts/DataLayer";
import Player from "./components/Player";
import { getTokenFromResponse } from "./spotify";
import "./index.css";
import Login from "./views/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SongList from './views/SongList';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <div className="app">
        <Route exact path="/login" render={() => <Login />} />
        <Switch>
          <Route exact path="/home" render={() => <SongList />} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;