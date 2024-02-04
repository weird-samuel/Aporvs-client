import { Link } from "react-router-dom";
import logo from "/images/logo-1.png";
const Navbar = () => {
  return (
    <section>
      <div className="bg-white text-black p-4 xl:px-24">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-24" />
          </Link>
        </div>
        <div className="flex"></div>
      </div>
    </section>
  );
};

export default Navbar;
