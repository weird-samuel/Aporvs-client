import propTypes from "prop-types";
// import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("You have been logged out");
    navigate("//");
  };
  return (
    <div>
      <div className="drawer drawer-end z-50 bg-[#E8E6EA]">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-circle avatar"
          >
            {/* {user.user.imageUrl ? (
              <div className="w-8 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.user.imageUrl}
                />
              </div>
            ) : (
              <FaRegUser />
            )} */}
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
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
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
