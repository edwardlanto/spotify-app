import React, { useState, useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";
import { store } from "../../store.js";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Searchbar() {
  const globalStore = useContext(store);
  const { dispatch } = globalStore;
  const [input, setInput] = useState(() => "");
  const history = useHistory();

  async function searchSpotify(e){
    try{
      e.preventDefault();
      const data = await axios
      .get(`/spotify/search?q=${input}`);

      dispatch({
        type:"SET_SEARCH_DATA",
        search_data: data
      })

      dispatch({
        type:"SET_CURRENT_PLAYLIST",
        current_playlist: data?.data
      })

      dispatch({
        type:"SET_CURRENT_INDEX",
        index: 1
      })

      


      history.push('/search')
    }catch(err){
      console.log('err');
    }
  };

  return (
    <form onSubmit={searchSpotify} className="searchBar">
      <SearchIcon />
      <input className="input-with-icon-adornment"
        placeholder="Search by track or name"
        onChange={(e) => setInput(e.target.value)}/>
    </form>
  );
}

export default Searchbar;
