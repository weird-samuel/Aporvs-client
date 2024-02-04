import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Footer from "../pages/components/Footer";
import Navbar from "../pages/components/Navbar";
const Main = () => {
  return (
    <SnackbarProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </SnackbarProvider>
  );
};

export default Main;
