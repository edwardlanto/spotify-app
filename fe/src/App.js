import React, { useEffect, useState, useContext } from "react";
import Body from "./components/Body";
import "./index.css";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Search from "./views/Search";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "./store";
import "./App.css";

function App() {
  const globalState = useContext(store);
  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState(() => []);
  const { dispatch } = globalState;
  const [error, setError] = useState(() => "");
  const [loading, setLoading] = useState(true);
  async function getPlaylist(id) {
    try {

      dispatch({
        type: "SET_IS_LOADING",
        is_loading: true,
      });

      const data = await axios.get("/spotify/get_playlist", {
        params: {
          id,
        },
      });

      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        current_playlist: data.data,
      });

      dispatch({
        type: "SET_IS_LOADING",
        is_loading: false,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await axios.get("/refresh_token");
        if(valid.status === 200){
          const initialData = await axios.get("/spotify/me");
          setUser(initialData?.data?.user);
          setPlaylists(initialData?.data?.playlists);
  
          dispatch({
            type: "SET_CURRENT_PLAYLIST",
            current_playlist: initialData?.data.current_playlist,
          });

          dispatch({
            type: "SET_AUTHORIZED",
            authorized: true
          });

        }
      } catch (err) {

        dispatch({
          type: "SET_AUTHORIZED",
          authorized: false
        });

        // setAuthorized(false);
        setError(err.message)
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <>
        {loading === true && (
          <Grid container justify="center" className="app__loader">
            <CircularProgress />
          </Grid>
        )}
        {globalState.state.authorized === false ? (
          <Login />
        ) : (
          <>
            <div className="app">
              <Header
                user={user}
                playlists={playlists}
                getPlaylist={getPlaylist}
              />
              <Sidebar playlists={playlists} getPlaylist={getPlaylist} />
              <Switch>
                <Route path="/" exact component={Body} />
                <Route path="/search" exact component={Search} />
              </Switch>
              <Footer />
              {error && error}
            </div>
          </>
        )}
      </>
    </Router>
  );
}

export default App;
