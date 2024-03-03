import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import PrivateRouter from "../protectedRoutes/PrivateRouter";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import ResetPassword from "../pages/ResetPassword";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import Users from "../pages/Users";
import ApplicationForm from "../pages/ApplicationForm";
import BookAppointment from "../pages/BookAppointment";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <UserDashboard />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRouter>
            <UpdateProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "/new-application",
        element: (
          <PrivateRouter>
            <ApplicationForm />
          </PrivateRouter>
        ),
      },
      {
        path: "/book-appointment",
        element: (
          <PrivateRouter>
            <BookAppointment />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRouter>
        <AdminDashboardLayout />
      </PrivateRouter>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard/users",
        element: <Users />,
      },
    ],
  },
]);

export default Router;
