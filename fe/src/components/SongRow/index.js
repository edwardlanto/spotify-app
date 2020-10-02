import React, { useContext } from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { store } from "../../store.js";
import axios from "axios";
import PauseIcon from "@material-ui/icons/Pause";
import spotify from "../../utils/spotifySingleton";

function SongRow({ track, index }) {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const play = (trackParams) => {
    spotify.play(trackParams);

    // Dispatch currently playings for other components to consume & to update ui.
    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: true
    });

    dispatch({
      type: "SET_CURRENTLY_PLAYING",
      currently_playing: trackParams,
    });

    dispatch({
      type: "SET_CURRENT_INDEX",
      index: index,
    });
  };

  const pause = () => {
    spotify.pause();
    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: false
    });
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playButton = (trackParams) => {
    if (globalState.state.is_playing === true && trackParams.preview_url === spotify.audio.src) {
      return (
        <IconButton onClick={() => pause()}>
          <PauseIcon />
        </IconButton>
      );
    } else if (
      globalState.state.is_playing === false &&
      trackParams.preview_url !== spotify.audio.src
    ) {
      return (
        <IconButton onClick={() => play(trackParams)}>
          <PlayArrowIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => play(trackParams)}>
          <PlayArrowIcon />
        </IconButton>
      );
    }
  };

  return (
    <Grid
      container
      spacing={1}
      className="songRow"
      alignItems="center"
      direction="row"
    >
      <Grid item xs={4}>
      <Grid container direction="row">
        {playButton(track)}
        <img
          className="songRow__album"
          src={track.album.images[0].url}
          alt=""
        />
          <div className="songRow__info">
            <h1>{track.name}</h1>
            <p>{track.artists.map((artist) => artist.name).join(", ")} - </p>
          </div>
        </Grid>
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
