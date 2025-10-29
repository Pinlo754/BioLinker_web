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
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Account from "../pages/Account/Account";
import AddLink from "../pages/SignUp/AddLink/AddLink";
import AddDomain from "../pages/SignUp/AddDomain/AddDomain";
import CreateNameBio from "../pages/SignUp/CreateNameBio/CreateNameBio";
import SelectPlatform from "../pages/SignUp/SelectPlatform/SelectPlatform";
import ProfilePage from "../pages/Bio/page";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import LogOut from "../pages/LogOut/LogOut";
import PaymentInfo from "../pages/PaymentInfo";
import MainLayout from "../components/sections/Layout";

const routers = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
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
        path: "/signup/add-link",
        element: <AddLink />,
      },
      {
        path: "/signup/add-domain",
        element: <AddDomain />,
      },
      {
        path: "/signup/create-name-bio",
        element: <CreateNameBio />,
      },
      {
        path: "/signup/select-platform",
        element: <SelectPlatform />,
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
        path: "/template-detail/:templateId",
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
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/biolinker/:userName",
        element: <ProfilePage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/logout",
        element: <LogOut />,
      },
      {
        path: "/payment",
        element: <PaymentInfo />,
      },
    ],
  },
]);

export default routers;
