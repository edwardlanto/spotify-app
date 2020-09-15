export const audioPlay = ({ spotify_uri }) => {
    let audio = new Audio(spotify_uri);
    audio.play();
}