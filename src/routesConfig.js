// App
import App from "./App";
// Components
import NotFound from "./components/error/NotFound";

const routesConfig = [
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>
  }
];

export default routesConfig;