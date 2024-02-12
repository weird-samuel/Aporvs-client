/* eslint-disable react/no-unescaped-entities */
import airplaneSvg from "/images/airplane.png";
import { useUser, SignUpButton } from "@clerk/clerk-react";
//
const Hero = () => {
  const user = useUser();
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-24 md:gap-8 -mt-14">
        <div className="md:w-1/2">
          <div className="hidden lg:flex flex-col md:flex-row items-center justify-around gap-4">
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
            {user.user ? (
              <button className="hidden md:block btn text-[#E8E6EA] bg-[#1F1F1F] hover:bg-[#1F1F1F] border-none outline-none py-3 font-semibold">
                Dashboard
              </button>
            ) : (
              <SignUpButton>
                <button className="hidden md:flex btn text-[#E8E6EA] bg-[#1F1F1F] hover:bg-[#1F1F1F] border-none outline-none px-10 py-3 font-semibold">
                  Get Started!
                </button>
              </SignUpButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
