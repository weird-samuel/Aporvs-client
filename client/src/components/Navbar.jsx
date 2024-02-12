import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import logo from "/images/logo-2.png";
import {
  useUser,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
const Navbar = () => {
  const { user } = useUser();
  return (
    <section className="flex md:px-4 py-4 xl:px-14 w-full justify-between items-center">
      <Link
        to={"/"}
        className="flex flex-wrap max-w-32 items-center justify-center -space-y-5 -mt-5"
      >
        <img src={logo} alt="logo" className="w-20" />
        <p>Aporvis</p>
      </Link>

      <div className="dropdown dropdown-end mr-5 md:mr-12 flex items-center">
        {user ? <p className="mr-2">Hi, {user.firstName}</p> : ""}
        <SignedOut>
          <SignInButton>
            <button className="btn btn-ghost border-none outline-none rounded-full px-6 flex items-center gap-2">
              <FaRegUser /> Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </section>
  );
};

export default Navbar;
