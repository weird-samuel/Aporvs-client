import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Signup from "../pages/Signup";
// import AdminDashboardLayout from "../layout/AdminDashboardLayout";
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/",
  //   element: <AdminDashboardLayout />,
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       path: "/admin/dashboard",
  //       element: <AdminDashboard />,
  //     },
  //   ],
  // },
]);

export default Router;
