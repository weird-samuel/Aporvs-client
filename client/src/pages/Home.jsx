import DescriptionCards from "./components/DescriptionCards";
import passportBg from "/images/passportsbg.png";
const Home = () => {
  return (
    <section className="h-[100%] w-full max-w-screen-2xl container mx-auto text-black">
      {/* <div className="h-[60%] w-full bg-[#185465] relative z-10">
        <div className="w-full h-full">
          <img
            src={passportBg}
            alt="passportsbg"
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}
      <div className="relative w-full h-[60%] overflow-hidden">
        <img
          src={passportBg}
          alt="passportsbg"
          className="absolute top-0 left-0 w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#185465] opacity-85"></div>
      </div>
      <DescriptionCards />

      {/* <div className="h-[40%] w-full bg-white"></div> */}
    </section>
  );
};

export default Home;
