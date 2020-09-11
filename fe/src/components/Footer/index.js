import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../../contexts/DataLayer";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./index.css";
import { Grid, Slider } from "@material-ui/core";

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();


  return (
    <div className="footer">
TEST
    </div>
  );
}

export default Footer;