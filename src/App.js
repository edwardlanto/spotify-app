import React, { useEffect, useState } from "react";
import Login from "./views/Login/";
import { getTokenFromUrl } from './spotify';

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const hash = getTokenFromUrl();
    console.log('hash', hash.access_token);
    const _token = hash.access_token;
    console.log('token', token);
    console.log('token', _token);

    if(_token){
      setToken(_token)
    }

    window.location.hash = "";
  });

  return (
    <div className="app">
      {
        token ? (
          <div>Logged In</div>
        ):
        (
          <Login />
        )
      }
    </div>
  );
}

export default App;
