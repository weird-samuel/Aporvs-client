import propTypes from "prop-types";
import { FaRegUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { enqueueSnackbar } from "notistack";

const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        enqueueSnackbar("Logged out successfully", {
          variant: "success",
        });
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
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-circle avatar"
          >
            {user.photoURL ? (
              <div className="w-8 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            ) : (
              <FaRegUser />
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
              <a>Order</a>
            </li>
            <li>
              <a>Settings</a>
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
