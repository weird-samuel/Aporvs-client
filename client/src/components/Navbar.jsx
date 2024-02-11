import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import logo from "/images/logo-2.png";
const Navbar = () => {
  return (
    <section className="flex md:px-4 py-4 xl:px-14">
      <div className="flex-1">
        <Link
          to={"/"}
          className="flex flex-wrap max-w-32 items-center justify-center -space-y-5 -mt-5"
        >
          <img src={logo} alt="logo" className="w-20" />
          <p>Aporvis</p>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost border-none outline-none rounded-full px-6 flex items-center gap-2">
            <FaRegUser /> Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
