import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import FindPartner from "../pages/FindPartner/FindPartner";
import MyConncetion from "../pages/MyConnection/MyConncetion";
import CreatePartnerProfile from "../pages/CreatePartnerProfile/CreatePartnerProfile";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../provider/PrivateRoute";
import PartnerDetails from "../pages/PartnerDetails/PartnerDetails";
import UpdatePartner from "../pages/UpdatePartner/UpdatePartner";
import MyProfile from "../pages/MyProfile/MyProfile";
import TopRatedPartner from "../pages/TopRatedPartner/TopRatedPartner";

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
        loader: () => fetch("http://localhost:3000/partners"),
        element: <FindPartner></FindPartner>,
      },
      {
        path: "/createProfile",
        element: (
          <PrivateRoute>
            <CreatePartnerProfile></CreatePartnerProfile>,
          </PrivateRoute>
        ),
      },
      {
        path: "/latest-partners",
        loader: () => fetch("http://localhost:3000/latest-partners"),
        element: <TopRatedPartner></TopRatedPartner>,
      },
      {
        path: "/my-conncetion",
        element: (
          <PrivateRoute>
            <MyConncetion></MyConncetion>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/partnerdetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/partners/${params.id}`),
        element: (
          <PrivateRoute>
            <PartnerDetails></PartnerDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updatePartner/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/partners/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdatePartner></UpdatePartner>
          </PrivateRoute>
        ),
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
