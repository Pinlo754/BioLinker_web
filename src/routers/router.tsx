import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/HomeScreen";
import About from "../pages/About/AboutScreen";
import NotFound from "../pages/NotFound/NotFoundScreen";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Market from "../pages/Market/Market";
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
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/about", 
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/marketplace",
    element: <Market />,
  },
  
]);

export default routers;
