import React from "react";
import "./index.css";
import Header from "../Header";
import { useDataLayerValue } from "../../contexts/DataLayer";
import SongRow from "../SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ current_playlist }, dispatch] = useDataLayerValue();
  console.log("current play", current_playlist);

  return (
    <div className="body">
    {/*

    <div className="body__info">
      <img src={discover_weekly?.images[0].url} alt="" />
      <div className="body__infoText">
        <strong>PLAYLIST</strong>
        <h2>Discover Weekly</h2>
        <p>{discover_weekly?.description}</p>
      </div>
    </div>
*/}
    <div className="body__songs">
      <div className="body__icons">
        {/* <PlayCircleFilledIcon
          className="body__shuffle"
          onClick={playPlaylist}
        /> */}
        <FavoriteIcon fontSize="large" />
        <MoreHorizIcon />
      </div>

    </div> 
  </div>
  );
}

export default Body;