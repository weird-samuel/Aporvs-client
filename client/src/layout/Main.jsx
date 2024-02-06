import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Footer from "../pages/components/Footer";
import Navbar from "../pages/components/Navbar";
const Main = () => {
  return (
    <SnackbarProvider>
      <Navbar />
      <div className="h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </SnackbarProvider>
  );
};

export default Main;
