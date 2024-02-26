import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader";
const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
