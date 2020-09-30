import React, { useContext } from "react";
import "./index.css";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import { store } from '../../store.js';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      color: "#fff",
    },
  },
}));

function searchSpotify(e){
  console.log(e.target.value)
}

function Header({ user }) {
  const globalStore = useContext(store);
  const spotify = globalStore.state.spotify;
  return (
    <div className="header">
      <div className="header__left">
        <Input
          className="input-with-icon-adornment"
          onChange={searchSpotify}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <div className="header__right">
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
