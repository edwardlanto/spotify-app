// store.js
import React, { createContext, useReducer } from "react";

const initialState = {
  current_playlist: [],
  currently_playing: {},
  spotify: null,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log("action", action);
    switch (action.type) {
      case "SET_CURRENT_PLAYLIST":
        return {
          ...state,
          current_playlist: action.current_playlist,
        };
      case "SET_CURRENTLY_PLAYING":
        return {
          ...state,
          currently_playing: action.currently_playing,
        };
      case "SET_SPOTIFY":
        return {
          ...state,
          spotify: action.spotify,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
