import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Routing
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Routes config
import routesConfig from "./routesConfig";

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>

  // Removed strict-mode to stop duplicate API requests
  <RouterProvider router={router} />
);