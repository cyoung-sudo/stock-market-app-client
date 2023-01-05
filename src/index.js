import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Routing
import { RouterProvider } from "react-router-dom";
// Router
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);