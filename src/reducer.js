export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  // token: process.env.REACT_APP_CLIENT_ID,
};

export const reducer = (state, action) => {

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN": {
        return {
            ...state,
            token: action.token
        }
    }
    case "SET_PLAYLISTS": {
      console.log("action ", action);
      return {
          ...state,
          playlists: action.playlists
      }
  }
    default:
      return state;
  }
};

export default reducer;
