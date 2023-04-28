import React, { useState } from "react";
import Login from "./Login";
import Survey from "./Survey";
import Header from './Header';
function App() {
  console.log(window.sessionStorage.getItem("auth"));
  return (
    <div>
      <Header />
      <>
        {window.sessionStorage.getItem("auth") == "true" ? <Survey /> : <Login />}
      </>
    </div>
  );
}

export default App;
