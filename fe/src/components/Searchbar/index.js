import React, { useState, useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
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

      history.push('/search')
    }catch(err){
      console.log('err');
    }
  };

  return (
    <form onSubmit={searchSpotify}>
      <Input
        className="input-with-icon-adornment"
        onChange={(e) => setInput(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </form>
  );
}

export default Searchbar;
