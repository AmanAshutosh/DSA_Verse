/**
 * main.jsx — Application Entry Point
 *
 * Mounts the React tree into the #root div defined in index.html.
 * Global CSS (index.css) is imported here so it applies everywhere.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global CSS variables, resets, scrollbar

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
