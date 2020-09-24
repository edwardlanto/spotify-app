import React from "react";
import "./index.css";
import { useDataLayerValue } from "../../contexts/DataLayer";
import SongRow from "../SongRow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body() {
  
  const [{ current_playlist }, dispatch] = useDataLayerValue();
  return (
    <div className="body">
    <div className="body__info">
      <div className="body__infoText">
        <strong>PLAYLIST</strong>
        <h2>{current_playlist?.name}</h2>
      </div>
    </div>
    <div className="body__songs">
      <div className="body__icons">
        {/* <PlayCircleFilledIcon
          className="body__shuffle"
          onClick={playPlaylist}
        /> */}
        <FavoriteIcon fontSize="large" />
        <MoreHorizIcon />
      </div>
      {current_playlist?.tracks?.items.map(item => (
        <SongRow track={item.track} playSong />
      ))}
    </div> 
  </div>
  );
}

export default Body;