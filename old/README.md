# Spotify Clone

A fullstack Spotify clone using the [Spotify Web Api](https://developer.spotify.com/documentation/web-api/)

## BE Code Structure

The backend is starts off with insantiating an Express instance and uses [cors](https://www.npmjs.com/package/cors) to allow the cross origin request to Spotifys server.

## FE Code Structure

The front end is React JS with Material UI library. All components are functional components
and use hooks to toggle state. A singleton pattern was created as well to preserve the audio state
to share amongst all components.

## Run the app

It is currently running at [https://spotify-app-edward-lanto.herokuapp.com/](https://spotify-app-edward-lanto.herokuapp.com/)

NOTE: To use this app you will need a Spotify Account to use the app.

You can also run it locally. Just clone this repo and set your ENV variables which you can get from the Spotify Developer dashboard.

https://github.com/edwardlanto/socket-discord-app.git

Next, run:

`
    npm install
    npm start
`
