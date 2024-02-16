import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader";
const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      <SnackbarProvider />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <div className="">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
