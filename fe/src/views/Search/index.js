import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { store } from "../../store";

function Search() {
  const globalState = useContext(store);

  console.log("OPBJECT", globalState);
  return <div className="search">SEARCH PAGE</div>;
}

export default Search;
