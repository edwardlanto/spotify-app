import React from "react";
import "./index.css";

function Header({ user }) {
  return (
    <div className="header">
      <div className="header__right">
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
