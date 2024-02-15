import { Link } from "react-router-dom";
// import { FaRegUser } from "react-icons/fa";
import logo from "/images/logo-2.png";
// import Profile from "./Profile";
const Navbar = () => {
  return (
    <section className="flex md:px-4 py-4 xl:px-14 max-w-full justify-between items-center">
      <Link
        to={"/"}
        className="flex flex-wrap max-w-28 items-center justify-center -space-y-5 -mt-5"
      >
        <img src={logo} alt="logo" className="w-20" />
        <p>Aporvis</p>
      </Link>

      <div className="dropdown dropdown-end">
        {/* {user ? (
          <div className="flex items-center justify-center">
            <p>Hi, {user.firstName}</p>
            <Profile user={user} />
          </div>
        ) : (
          <div>
            <button className="btn btn-ghost border-none outline-none rounded-full px-6 flex items-center gap-2">
              <FaRegUser /> Sign In
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default Navbar;
