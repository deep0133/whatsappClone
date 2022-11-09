import React from "react";
import ReactDOM from "react-dom";
import UserState from "./context/UserState";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <App />
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
