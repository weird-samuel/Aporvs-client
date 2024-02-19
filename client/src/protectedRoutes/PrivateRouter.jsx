import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import PropType from "prop-types";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;

PrivateRouter.propTypes = {
  children: PropType.node.isRequired,
};
