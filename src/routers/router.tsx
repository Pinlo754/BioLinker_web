import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/HomeScreen";
import About from "../pages/About/AboutScreen";
import NotFound from "../pages/NotFound/NotFoundScreen";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Market from "../pages/Market/Market";
import TemplateDetail from "../pages/TemplateDetail/TemplateDetail";
import MyCollection from "../pages/MyCollection/MyCollection";
import Getstarted from "../pages/GetStarted/GetStarted";
import Dashboard from "../pages/Dashboard/Dashboard";
import BioBuilder from "../pages/Bio-Edit/page";

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
  {
    path: "/template-detail",
    element: <TemplateDetail />,
  },
  {
    path: "/my-collection",
    element: <MyCollection />,
  },
  {
    path: "/get-started",
    element: <Getstarted />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/bio-edit",
    element: <BioBuilder />,
  }
]);

export default routers;
