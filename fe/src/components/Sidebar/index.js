import React from "react";
import "./index.css";
import SidebarOption from "../SidebarOption.js";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import HomeIcon from "@material-ui/icons/Home";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Hidden from "@material-ui/core/Hidden";

function Sidebar({ playlists, getPlaylist }) {
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
          <button type="button">
            <LibraryMusicIcon />
            <h4>Your Library</h4>
          </button>
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
      </div>
    </Hidden>
  );
}

export default Sidebar;
