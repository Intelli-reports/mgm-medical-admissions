import React from "react";
import ReactDOM from "react-dom/client";

// Safety: Some libraries expect 'global' to exist (fixes potential white screen crashes)
if (typeof global === "undefined") {
  window.global = window;
}
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

const Router = window.location.protocol === "file:" ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
