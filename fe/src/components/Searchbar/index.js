import React, { useState, useContext, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { store } from "../../store.js";
import axios from "axios";

function Searchbar() {
  const globalStore = useContext(store);
  const [input, setInput] = useState(() => "");
  const [submitted, setSubmitted] = useState(() => false);

  async function searchSpotify(e){
    e.preventDefault();
      const data = await axios
      .get(`/spotify/search?q=${input}`)
    console.log("DATA", data);
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
