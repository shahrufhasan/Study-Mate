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
import About from "../pages/About/About";
import Error from "../pages/Error/Error";
import axios from "axios";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        loader: async () => {
          const response = await axios.get(
            "http://localhost:3000/latest-partners"
          );
          return response.data;
        },
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/findPartners",
        loader: async () => {
          const response = await axios.get("http://localhost:3000/partners");
          return response.data;
        },
        element: <FindPartner></FindPartner>,
      },
      {
        path: "/createProfile",
        element: (
          <PrivateRoute>
            <CreatePartnerProfile></CreatePartnerProfile>
          </PrivateRoute>
        ),
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
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3000/partners/${params.id}`
          );
          return response.data;
        },
        element: (
          <PrivateRoute>
            <PartnerDetails></PartnerDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updatePartner/:id",
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3000/partners/${params.id}`
          );
          return response.data;
        },
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
