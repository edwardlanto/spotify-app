import React, { useEffect, useContext, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { store } from "../../store.js";
import "./index.css";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import spotify from "../../utils/spotifySingleton";

function Footer() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [value, setValue] = React.useState(30);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const skipNext = () => {
    if (globalState.state.index === null) {
      playFirstSong();
    } else {
      spotify.play(
        globalState.state.current_playlist.tracks.items[
          globalState.state.index + 1
        ].track
      );

      dispatch({
        type: "SET_CURRENTLY_PLAYING",
        currently_playing:
          globalState.state.current_playlist.tracks.items[
            globalState.state.index + 1
          ].track,
      });

      dispatch({
        type: "SET_CURRENT_INDEX",
        index: globalState.state.index + 1,
      });
    }
  };

  const skipPrevious = () => {
    if (globalState.state.index === null || globalState.state.index === 0) {
      playFirstSong();
    } else {
      spotify.play(
        globalState.state.current_playlist.tracks.items[
          globalState.state.index - 1
        ].track
      );

      dispatch({
        type: "SET_CURRENTLY_PLAYING",
        currently_playing:
          globalState.state.current_playlist.tracks.items[
            globalState.state.index - 1
          ].track,
      });

      dispatch({
        type: "SET_CURRENT_INDEX",
        index: globalState.state.index - 1,
      });
    }

    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: true,
    });
  };

  const playPause = () => {
    if (globalState.state.currently_playing === null) {
      playFirstSong();
    } else if (
      globalState.state?.is_playing === false &&
      globalState.state?.currently_playing
    ) {
      spotify.audio.play();
      dispatch({
        type: "SET_IS_PLAYING",
        is_playing: true,
      });
    } else {
      spotify.audio.pause();
      dispatch({
        type: "SET_IS_PLAYING",
        is_playing: false,
      });
    }
  };

  const playButton = () => {
    if (globalState.state.is_playing === true) {
      return (
        <IconButton aria-label="pause" onClick={playPause}>
          <PauseIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton aria-label="play" onClick={playPause}>
          <PlayCircleOutlineIcon />
        </IconButton>
      );
    }
  };

  // Plays first in playlist if no song is already available
  const playFirstSong = () => {
    const firstSong = globalState.state.current_playlist.tracks.items[0].track;
    spotify.play(firstSong);

    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: true,
    });

    // dispatch({
    //   type: "SET_CURRENTLY_PLAYING",
    //   currently_playing: firstSong,
    // });

    // // If first song is chosen, set index to 0 and set to keep track for prev & next functions.
    // dispatch({
    //   type: "SET_CURRENT_INDEX",
    //   index: 0,
    // });
  };

  return (
    <div className="footer">
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Grid container direction="row" alignItems="center">
            <img
              className="footer__album"
              src={globalState.state.currently_playing?.album?.images[0].url}
              alt=""
            />
            <div className="songRow__info">
              <h6>{globalState.state.currently_playing?.name}</h6>
              <div>
                <p>
                  {globalState.state.currently_playing?.artists
                    .map((artist) => artist?.name)
                    .join(", ")}{" "}
                  -{" "}
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container direction="row" justify="center">
            <IconButton aria-label="previous" onClick={skipPrevious}>
              <SkipPreviousIcon />
            </IconButton>
            {playButton()}
            <IconButton aria-label="next" onClick={skipNext}>
              <SkipNextIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={1} className="footer__sliderContainer">
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                value={value}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
