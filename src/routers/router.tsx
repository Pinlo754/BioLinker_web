import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/HomeScreen";
import About from "../pages/About/AboutScreen";
import NotFound from "../pages/NotFound/NotFoundScreen";
import Login from "../pages/Login/Login";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  
]);

export default routers;
