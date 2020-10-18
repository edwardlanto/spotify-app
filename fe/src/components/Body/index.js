import React, { useContext } from "react";
import "./index.css";
import SongRow from "../SongRow";
import { store } from "../../store.js";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from "@material-ui/core/Hidden";

function Body() {
  const globalState = useContext(store);

  return (
    <div className="body">
      <div className="body__info">
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{globalState.state.current_playlist?.name}</h2>
        </div>
      </div>
      <div className="body__songs">
        {globalState.state.is_loading === false ? (
          <>
            <div className="body__icons">
            </div>
            <Grid container alignItems="center" xs="hidden">
              <Grid item xs={4} md={4}>
                Title
              </Grid>
              <Hidden smDown={true}>
                <Grid item md={3}>
                  Artist
                </Grid>
              </Hidden>
              <Hidden smDown={true}>
              <Grid item xs={3}>
                Release Date
              </Grid>
              <Grid item xs={2}>
                Time
              </Grid>
              </Hidden>
            </Grid>
            {globalState.state.current_playlist?.tracks?.items.map(
              (item, i) => (
                <SongRow track={item.track} playSong key={i} index={i} />
              )
            )}
          </>
        ) : (

          // Added Loader if body songs take a while to load
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Body;
