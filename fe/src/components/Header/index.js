import React from "react";
import "./index.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../../contexts/DataLayer";

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input placeholder="Search for Songs" type="text" />
      </div>
      <div className="header__right">
        {user?.images[0] ? (
          <Avatar alt={user?.display_name} src={user?.images[0].url} />
        ) : (
          <div>None</div>
        )}

        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
