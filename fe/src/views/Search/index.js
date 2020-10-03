import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { store } from "../../store";
import SongRow from "../../components/SongRow";

function Search() {
  const globalState = useContext(store);

  console.log("OPBJECT", globalState);
  return (
    <div className="searchPage">
      {globalState.state.search_data == [] ? <div>TEST</div>: 
      <>
      <Grid container spacing={1} alignItems="center">
        <h3>Tracks</h3>
        <Grid item xs={4}>
          Title
        </Grid>
        <Grid item xs={3}>
          Artist
        </Grid>
        <Grid item xs={3}>
          Release Date
        </Grid>
        <Grid item xs={2}>
          Time
        </Grid>
      </Grid>
      <div>
        {globalState.state.search_data?.data?.tracks.map((track, i) => (
          <SongRow track={track} playSong key={i} index={i} />
        ))}
      </div>
      </>
}
    </div>
  );
}

export default Search;
