import React, { useContext } from "react";
import "./index.css";
import SidebarOption from "../SidebarOption.js";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import axios from "axios";
import { store } from "../../store.js";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import { useHistory } from "react-router-dom";

function Sidebar({ playlists }) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const history = useHistory();
  const getPlaylist = (id) => {
    history.push("/");
    
    dispatch({
      type: "SET_IS_LOADING",
      is_loading: true
    });

    axios.get("/spotify/get_playlist", {
      params: {
        id
      }
    }).then((res) => {

      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        current_playlist: res.data
      });

      dispatch({
        type: "SET_IS_LOADING",
        is_loading: false
      });

    });
  };

  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="logo"
        className="sidebar__logo"
      />
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
      {playlists?.items &&
        playlists.items.map((playlist) => {
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
  );
}

export default Sidebar;
