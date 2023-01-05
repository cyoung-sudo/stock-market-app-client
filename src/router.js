// Routing
import { createBrowserRouter } from "react-router-dom";
// App
import App from "./App";
// Components
import NotFound from "./components/error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>
  }
]);

export default router;