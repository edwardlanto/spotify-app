export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:5000";
const clientId = process.env.REACT_APP_CLIENT_ID;

// Privileges to Spotify API
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state"
];

export const getTokenFromResponse = () => {
  return window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, item) => {
    let parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
    console.log('initial', initial);
    return initial
  }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
