import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { RiStackFill } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaEdit, FaLocationArrow, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { enqueueSnackbar } from "notistack";

const sharedLinks = (
  <>
    <li>
      <Link to={"/admin/approve-visa"}>
        <FaLocationArrow />
        Approve Visa
      </Link>
    </li>
    <li>
      <Link to={"/admin/manage-admin"}>
        <FaEdit />
        manage Admins
      </Link>
    </li>
  </>
);
const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        enqueueSnackbar("Logged out successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error" + err.message, { variant: "error" });
      });
  };
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn drawer-button md:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button
              className="btn btn-ghost rounded-full px-6 flex items-center gap-2 bg-base-200 sm:hidden"
              onClick={handleLogout}
            >
              <FaUser />
              Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to={"/admin/dashboard"} className="flex justify-start mb-3">
                <div className="font-semibold text-3xl">APORVIS</div>
                <span>
                  <div className="badge badge-primary badge-outline">Admin</div>
                </span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to={"/admin/dashboard"}>
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={"/admin/dashboard/users"}>
                <FaUsers />
                All Users
              </Link>
            </li>
            <li>
              <Link to={"/admin/dashboard/applications"}>
                <RiStackFill />
                Pending Applications
              </Link>
            </li>
            <li>
              <Link to={"/admin/dashboard/appointments"}>
                <AiOutlineSchedule />
                All Appointments
              </Link>
            </li>
            <li>
              <Link className="md:flex mb-3 hidden" onClick={handleLogout}>
                <FaUser />
                Logout
              </Link>
            </li>
            <hr />
            {/* shared links */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
