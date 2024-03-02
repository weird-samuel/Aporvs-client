import propTypes from "prop-types";
import { FaRegUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        enqueueSnackbar("Logged out successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error" + err.message),
          {
            variant: "error",
          };
      });
  };
  return (
    <div>
      <div className="drawer z-10 bg-[#E8E6EA]">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-circle avatar"
          >
            {user.image ? (
              <div className="w-8 rounded-full">
                <img alt="img-here" src={user.image} />
              </div>
            ) : (
              <FaRegUser className="text-2xl rounded-full overflow-hidden" />
            )}
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

Profile.propTypes = {
  user: propTypes.object.isRequired,
};
