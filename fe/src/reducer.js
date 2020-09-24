export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
  current_playlist:[]
};

export const reducer = (state, action) => {
  console.log('ACTION REDUCER', action);
  switch (action.type) {
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        current_playlist: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
