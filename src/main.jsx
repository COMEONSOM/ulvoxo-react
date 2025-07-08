// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Make sure Tailwind and FontAwesome are applied

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
