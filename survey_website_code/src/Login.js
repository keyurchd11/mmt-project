import React from "react";
import "./Login.css";

function Login(props) {
  const CLIENT_ID = "8f848b2963904d9aadabd73e4e4dc121";
  const REDIRECT_URI = "http://localhost:3000/survey";

  const handleLogin = () => {
    window.sessionStorage.setItem("auth", false);
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-top-read",
    ].join(" ");
    window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      scopes
      )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.sessionStorage.setItem("auth", true);
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Welcome to the Survey</h1>
      <p className="login-description">
        This survey collects data on your top songs from Spotify. Please log in
        with your Spotify account to continue.
      </p>
      <div className="login-agreement">
        <p>
          By clicking "Log in with Spotify," you agree to share your top songs
          data with this survey application.
        </p>
      </div>
      <button className="login-button" onClick={handleLogin}>
        Log in with Spotify
      </button>
    </div>
  );
}

export default Login;