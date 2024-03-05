/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link } from "react-router-dom";
import airplaneSvg from "/images/airplane.png";
import { AuthContext } from "../context/AuthProvider";
//
const Hero = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col md:flex-row-reverse justify-between items-center md:-mt-20">
      <div className="md:w-1/2">
        <div className="hidden lg:flex flex-col md:flex-row items-center">
          <img src={airplaneSvg} alt="Hero-image" />
        </div>
      </div>
      <div className="md:w-1/2 px-4">
        <div className="md:w-5/6 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug">
            Delve into the World of Seamless Visa Application
          </h2>
          <p className="text-xl roboto">
            We are committed to making your visa application easy and fair for
            you!
          </p>
          {user ? (
            <Link
              className="hidden md:flex w-48 btn text-[#E8E6EA] bg-[#1F1F1F] hover:bg-[#1F1F1F] border-none outline-none font-semibold"
              to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
            >
              Go To Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="hidden md:flex btn text-[#E8E6EA] bg-[#1F1F1F] hover:bg-[#1F1F1F] border-none outline-none w-36 font-semibold"
            >
              Get Started!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
