import React, { useContext } from "react";
import "./index.css";
import SidebarOption from "../SidebarOption.js";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import HomeIcon from "@material-ui/icons/Home";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Hidden from "@material-ui/core/Hidden";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { store } from "../../store";

function Sidebar({ playlists, getPlaylist }) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const logout = () => {
    axios.get(`/api/logout`).then(() => {
      dispatch({
        type:"SET_AUTHORIZED",
        authorized: false
      });
    });
  }

  return (
    // Desktop Sidebar
    <Hidden smDown={true}>
      <div className="sidebar sidebar__desktop">
        <div className="sidebar__top">
          <Link to="/">
            <HomeIcon />
            <h4>Home</h4>
          </Link>
          <Searchbar />
        </div>
        <strong className="sidebar__title">Playlists</strong>
        <hr />
        {playlists?.items?.map((playlist) => {
            return (
              <SidebarOption
                title={playlist.name}
                key={playlist.name}
                getPlaylist={getPlaylist}
                id={playlist.id}
              />
            );
          })}
              <div className="sidebarOption">
        {<ExitToAppIcon className="sidebarOption__icon" />}
        {<button type="button" onClick={() => logout()}><h4>Logout</h4></button> }
    </div>
      </div>
    </Hidden>
  );
}

export default Sidebar;
