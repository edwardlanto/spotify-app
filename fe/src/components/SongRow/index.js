import React, { useContext } from "react";
import "./index.css";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { store } from '../../store.js';
import axios from 'axios';

function SongRow({ track, playSong }) {
  const globalState = useContext(store);
  console.log('track', track);
  const play = (uri) => {
    globalState.state.spotify.play({
        uris: [`${uri}`]
    })
  }

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <Grid container spacing={1} className="songRow" alignItems="center" direction="row">
      <Grid item xs={4} direction="row" alignItems="center">
        <IconButton onClick={() => play(track.uri)}>
          <PlayArrowIcon />
        </IconButton>
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
  
        </p>
      </div>
      </Grid>
      <Grid item xs={3} direction="row" alignItems="center">
      {track.album.name}
      </Grid>
      <Grid item xs={3} direction="row" alignItems="center">
        {track.album.release_date}
      </Grid>
      <Grid item xs={2} direction="row" alignItems="center">
        {millisToMinutesAndSeconds(track.duration_ms)}
      </Grid>
    </Grid>
  );
}

export default SongRow;