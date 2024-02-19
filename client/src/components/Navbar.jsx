import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import logo from "/images/logo-2.png";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Profile from "./Profile";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return (
    <header className="container mx-auto p-4 flex items-center justify-between z-10">
      <div className="navbar">
        <div className="navbar-start">
          <Link
            to={location.pathname}
            className="flex flex-wrap max-w-28 items-center justify-center -space-y-5 -mt-5"
          >
            <img src={logo} alt="logo" className="w-20" />
            <p>Aporvis</p>
          </Link>
        </div>
        <div className="navbar-end">
          {/* Login btn */}
          {user ? (
            <div className="flex items-center">
              {location.pathname === "/dashboard" && (
                <Link to={"/find-application"} className="text-[#191D31] mr-2">
                  Find Application
                </Link>
              )}
              <Profile user={user} />
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-ghost rounded-full px-6 flex items-center gap-2 bg-base-200 transition-all duration-300"
            >
              <FaRegUser /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
