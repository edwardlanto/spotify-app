import React, { useState } from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Searchbar from "../../components/Searchbar";
import HomeIcon from "@material-ui/icons/Home";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { Link } from "react-router-dom";
import SidebarOption from "../SidebarOption.js";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import Hidden from "@material-ui/core/Hidden";

function Header({ user, playlists, getPlaylist }) {
  const [open, setOpen] = useState(() => false);
  const list = () => (
    <div className="sidebar__mobileMenu">
      <div className="sidebar sidebar__desktop">
        <div className="sidebar__top">
        <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
            alt="logo"
            className="sidebar__logo"
          />
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
    </div>
  );

  return (
    <Grid container justify="space-between" className="header" alignItems="center">
      <Grid item xs={8} sm={6}>
        <Grid container direction="row" alignItems="center">
          <Hidden mdUp={true}>
            <Button onClick={() => setOpen(true)} className="header__menuButton">
              {open  === false ? <MenuIcon /> : <ClearIcon />}
            </Button>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
              {list()}
            </Drawer>
          </Hidden>
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
            alt="logo"
            className="header__logo"
          />
        </Grid>
      </Grid>
      <Grid item className="header__right">
        <h4>{user?.display_name}</h4>
      </Grid>
    </Grid>
  );
}

export default Header;
