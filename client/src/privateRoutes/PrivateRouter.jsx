import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-react";
// import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import PropType from "prop-types";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const PrivateRouter = ({ children }) => {
  // const location = useLocation();

  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ClerkLoading>
      <Loader />
    </ClerkLoading>
    <ClerkLoaded>{children};</ClerkLoaded>;
  </ClerkProvider>;
  // {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }
};

export default PrivateRouter;

PrivateRouter.propTypes = {
  children: PropType.node.isRequired,
};
