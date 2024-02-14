import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdDashboardCustomize,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaBriefcase, FaLocationArrow, FaPlus, FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { SignOutButton, useUser } from "@clerk/clerk-react";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to={"/"}>
        <IoHome />
        Home
      </Link>
    </li>
    <li>
      <Link to={"/order-tracking"}>
        <FaLocationArrow />
        Activity Tracking
      </Link>
    </li>
    <li>
      <Link to={"/customer-support"}>
        <MdOutlineSupportAgent />
        Customer Support
      </Link>
    </li>
  </>
);

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const user = useUser();
  const handleLogout = () => {
    alert("You have been logged out");
    navigate("/");
  };
  return (
    <div className="bg-[#E8E6EA] text-[#191D31]">
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn drawer-button lg:hidden bg-[#191D31]"
            >
              <MdDashboardCustomize className="text-[#E8E6EA]" />
            </label>
            {user ? (
              <div
                className="btn btn-ghost rounded-full px-6 flex items-center gap-2 bg-base-200 sm:hidden"
                onClick={handleLogout}
              >
                <SignOutButton />
                <FaUser />
              </div>
            ) : (
              (alert("You are not logged in"), navigate("/"))
            )}
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
            <div>
              <Link to={"/admin/dashboard"} className="flex justify-start mb-3">
                <div className="font-semibold text-3xl">APORVIS</div>
                <span>
                  <div className="badge badge-primary badge-outline">Admin</div>
                </span>
              </Link>
            </div>
            <hr />
            <li className="mt-3">
              <Link to={"/admin/dashboard"}>
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={"/applications"}>
                <FaBriefcase />
                Manage Applications
              </Link>
            </li>
            <li>
              <Link to={"/admin/dashboard"}>
                <FaPlus />
                Update Requirements
              </Link>
            </li>
            <li className="mb-3">
              <Link to={"/admin/dashboard/users"}>
                <FaUsers />
                All Users
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
