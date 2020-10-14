import React, { useContext, useState } from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { store } from "../../store.js";
import PauseIcon from "@material-ui/icons/Pause";
import spotify from "../../utils/spotifySingleton";
import Hidden from "@material-ui/core/Hidden";
import Popover from "@material-ui/core/Popover";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function SongRow({ track, index }) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [infoState, setInfoState] = useState(() => false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const play = (trackParams) => {
    spotify.play(trackParams);

    // Dispatch currently playings for other components to consume & to update ui.
    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: true,
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
      is_playing: false,
    });
  };

  // Used to convert time
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  // Renders pause Button. Checks if audio is playing and from the list of
  // songs, it matches the current audio to the preview url.
  const playPauseButton = (trackParams) => {
    if (
      globalState.state.is_playing === true &&
      trackParams?.preview_url === spotify.audio.src
    ) {
      return (
        <IconButton onClick={() => pause()}>
          <PauseIcon />
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

  const handleInfoState = (event) => {
    setAnchorEl(event.currentTarget);
    setInfoState(true);
  };

  return (
    <Grid container className="songRow" direction="row">
      <Grid item sm={6} md={4}>
        <Grid container spacing={1}>
          <Grid item>{playPauseButton(track)}</Grid>
          <Grid>
            <img
              className="songRow__album"
              src={track?.album.images[0].url}
              alt=""
            />
          </Grid>
          <Grid>
            <div className="songRow__info">
              <h1>{track?.name}</h1>
              <p>{track?.artists.map((artist) => artist.name).join(", ")} - </p>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Hidden smDown={true}>
        <Grid item xs={3}>
          {track?.album.name}
        </Grid>
        <Grid item xs={3}>
          {track?.album.release_date}
        </Grid>
        <Grid item xs={2}>
          {millisToMinutesAndSeconds(track?.duration_ms)}
        </Grid>
      </Hidden>

      {/* Extra info is added in a popover on moible */}
      <Hidden mdUp={true}>
        <Grid item xs={3}>
          <IconButton onClick={handleInfoState}>
            <MoreHorizIcon />
          </IconButton>
        </Grid>
      </Hidden>
      <Popover
        open={infoState}
        anchorEl={anchorEl}
        className="songRow__popOver"
        onClose={() => setInfoState(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {" "}
        <Grid item xs={12}>
          Release Date - {track?.album.release_date}
        </Grid>
        <Grid item xs={12}>
            Time - {millisToMinutesAndSeconds(track?.duration_ms)}
        </Grid>
      </Popover>
    </Grid>
  );
}

export default SongRow;
