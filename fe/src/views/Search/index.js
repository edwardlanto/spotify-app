import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { store } from "../../store";
import SongRow from "../../components/SongRow";
import "./index.css";

function Search() {
  const globalState = useContext(store);
  return (
    <div className="searchPage">
      <div className="searchPage__infoText">
        <h2>Search Results</h2>
      </div>
      {globalState.state.search_data?.data?.tracks ? (
        <>
          <Grid container spacing={1} alignItems="center">
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
      ) : (
        <div>There are no search results, please provide a search query.</div>
      )}
    </div>
  );
}

export default Search;
