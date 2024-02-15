// import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <section className="w-[100vw]">
      <section className="px-4 xl:px-14 flex">
        <Hero />
      </section>
      <div className="lg:hidden px-4 xl:px-14 flex items-center justify-center">
        <div className="mockup-browser border bg-base-300 mt-10 -z-0">
          <div className="mockup-browser-toolbar">
            <div className="input">https://aporvis.com</div>
          </div>
          {/* <div className="px-4 py-12 space-y-4 bg-base-200 text-center">
            {user.user ? (
              <p>Click to see Your Dashboard</p>
            ) : (
              <p>Click the button below to get started!</p>
            )}
            <div className="w-full flex justify-center items-center">
              {user.user ? (
                <Link className="md:hidden flex btn text-[#E8E6EA] bg-[#1F1F1F] hover:bg-[#1F1F1F] border-none outline-none px-10 py-3 font-semibold">
                  Dashboard
                </Link>
              ) : (
                <SignUpButton>
                  <button className="md:hidden flex btn text-[#E8E6EA] bg-[#1F1F1F] hover:bg-[#1F1F1F] border-none outline-none px-10 py-3 font-semibold">
                    Get me Started!
                  </button>
                </SignUpButton>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
// #B5EF65 Green
// #E8E6EA White
// #191D31 Darker Green
