import React from "react";
import "./index.css";
import SidebarOption from "../SidebarOption.js";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

function Sidebar({playlists}) {
  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="logo"
        className="sidebar__logo"
      />
      <SidebarOption title="Home" Icon={HomeIcon} className="sidebar__icon" />
      <SidebarOption
        title="Search"
        Icon={SearchIcon}
        className="sidebar__icon"
      />
      <SidebarOption
        title="Your Library"
        Icon={LibraryMusicIcon}
        className="sidebar__icon"
      />
      <strong className="sidebar__title">Playlists</strong>
      <hr />
      {console.log('playlists', playlists)}
      {playlists?.items && playlists.items.map((playlist) => {
          return(
            <SidebarOption title={playlist.name} />
          );
      })}
    </div>
  );
}

export default Sidebar;
