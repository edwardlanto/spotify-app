import React from "react";
import "./index.css";
import Searchbar from '../../components/Searchbar';

function Header({ user }) {
  return (
    <div className="header">
      <div className="header__left">
        <Searchbar />
      </div>
      <div className="header__right">
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
