import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import FindPartner from "../pages/FindPartner/FindPartner";
import MyConncetion from "../pages/MyConnection/MyConncetion";
import CreatePartnerProfile from "../pages/CreatePartnerProfile/CreatePartnerProfile";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/findPartners",
        element: <FindPartner></FindPartner>,
      },
      {
        path: "/createProfile",
        element: <CreatePartnerProfile></CreatePartnerProfile>,
      },
      {
        path: "/myConncetion",
        element: <MyConncetion></MyConncetion>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
