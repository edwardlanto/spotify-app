import React, { useState, useContext } from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Searchbar from "../../components/Searchbar";
import HomeIcon from "@material-ui/icons/Home";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { Link } from "react-router-dom";
import SidebarOption from "../SidebarOption.js";

function Header({ user, playlists, getPlaylist }) {
  const [open, setOpen] = useState(() => false);
  const list = () => (
    <div className="sidebar__mobileMenu">
      <div className="sidebar sidebar__desktop">
        <div className="sidebar__top">
          <Link to="/">
            <HomeIcon />
            <h4>Home</h4>
          </Link>
          <Searchbar />
          <button type="button" >
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
    </div>
  )

  return (
    <Grid container justify="space-between" className="header">
      <Grid item xs={1}>
        <img
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="logo"
          className="header__logo"
        />
      </Grid>
      <Grid item>
        <Button onClick={() => setOpen(true)} className="header__menuButton">
          test
        </Button>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          {list()}
        </Drawer>
      </Grid>
      <Grid item className="header__right">
        <h4>{user?.display_name}</h4>
      </Grid>
    </Grid>
  );
}

export default Header;
