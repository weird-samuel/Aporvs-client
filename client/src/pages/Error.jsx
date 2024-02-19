/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import "./Error.css";
const Error = () => {
  const navigate = useNavigate();
  return (
    <section className="body">
      <img
        src="https://assets.codepen.io/1538474/404.svg"
        className="logo-404"
        alt="404 Logo"
      />
      <p className="title">Oh no!!</p>
      <p className="subtitle">
        You're either misspelling the URL <br /> or requesting a page that
        doesn't exist.
      </p>
      <div className="flex items-center justify-center">
        <a
          className="text-white cursor-pointer border p-3 font-normal hover:bg-slate-900 transition-all duration-300 ease-in-out"
          onClick={() => navigate(-1)}
        >
          Back to Previous Page
        </a>
      </div>
      <img
        src="https://ouch-cdn2.icons8.com/KH5STIbqaPWealT8YFvyjFTAj_kokneFXq29l27YW3U/rs:fit:368:276/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTk2/L2IzODU2N2YyLTZj/NWUtNGQ5YS04OTQy/LWI2ZWQzOTM2OGNi/YS5zdmc.png"
        className="astronaut"
        alt="Astronaut"
      />
    </section>
  );
};

export default Error;
