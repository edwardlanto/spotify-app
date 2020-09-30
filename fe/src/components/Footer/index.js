import React, { useEffect, useContext, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { store } from "../../store.js";
import "./index.css";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";

function Footer({ currently_playing }) {
  const globalState = useContext(store);
  const [isPlaying, setIsPlaying] = useState(() => false);
  console.log("currently_playing", globalState );
  const handlePlayPause = () => {};

  const skipNext = () => {};

  const skipPrevious = () => {
    alert("prev");
  };

  useEffect(() => {
    setIsPlaying(currently_playing.is_playing);
  }, [] )

  const playPause = () => {
    alert(isPlaying)

    if(isPlaying == true){
      setIsPlaying(false);
      globalState.state.spotify.pause();
    }else if(isPlaying == false){
      setIsPlaying(true);
      globalState.state.spotify.play({
        uris: [`${currently_playing?.item.uri}`]
      });
    }else{
      return;
    }
  };

  return (
    <Grid container spacing={1} className="footer">
      <Grid container direction="row" alignItems="center" xs={12} md={3}>
        <img
          className="footer__album"
          src={currently_playing?.item?.album?.images[0].url}
          alt=""
        />
        <div
          className="songRow__info"
          direction="row"
          container
          alignItems="center"
        >
          <h6>{currently_playing?.item?.name}</h6>
          <div>
            <p>
              {currently_playing?.item?.artists
                .map((artist) => artist?.name)
                .join(", ")}{" "}
              -{" "}
            </p>
          </div>
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        xs={12}
        md={6}
        justify="center"
      >
        <IconButton aria-label="previous" onClick={skipPrevious}>
          <SkipPreviousIcon />
        </IconButton>
        {isPlaying  ? (
          <IconButton aria-label="pause" onClick={playPause}>
            <PauseIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="play" onClick={playPause}>
            <PlayCircleOutlineIcon />
          </IconButton>
        )}
        <IconButton aria-label="next" onClick={skipNext}>
          <SkipNextIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Footer;
