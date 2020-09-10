import React, { useEffect } from "react";
import Login from "./views/Login/";
import { getTokenFromUrl } from './spotify';

function App() {
  useEffect(() => {
    const token = getTokenFromUrl();
    window.location.hash = ""
    console.log('token', token);
  });

  return (
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
