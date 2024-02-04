import { Link } from "react-router-dom";
import logo from "/images/logo-1.png";
const Navbar = () => {
  return (
    <section className="bg-white text-black max-w-screen-2xl container mx-auto px-4 xl:px-24">
      <div className="flex justify-between">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-20 h-20" />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link to={"/login"} className="mx-4">
            Log-in
          </Link>
          <Link to={"/signup"} className="mx-4 bg-gray-300 p-2">
            Sign-up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
