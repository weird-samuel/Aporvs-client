import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <SnackbarProvider>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </SnackbarProvider>
  );
};

export default Main;
