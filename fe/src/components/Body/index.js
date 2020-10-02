import React, { useEffect, useContext } from 'react';
import "./index.css";
import SongRow from "../SongRow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { store } from '../../store.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function Body() {
  const globalState = useContext(store);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  return (
    <div className="body">
    <div className="body__info">
      <div className="body__infoText">
        <strong>PLAYLIST</strong>
        <h2>{globalState.state.current_playlist?.name}</h2>
      </div>
    </div>
    <div className="body__songs">
      <div className="body__icons">
        <FavoriteIcon fontSize="large" />
        <MoreHorizIcon />
      </div>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={4}>
          Title
        </Grid>
        <Grid item xs={3}>
          Artist
        </Grid>
        <Grid item xs={3}>
          Release Date
        </Grid>
        <Grid item xs={2}>
          Time
        </Grid>
      </Grid>
      {globalState.state.current_playlist?.tracks?.items.map((item, i )=> (
        <SongRow track={item.track} playSong key={i} index={i}/>
      ))}
    </div> 
  </div>
  );
}

export default Body;