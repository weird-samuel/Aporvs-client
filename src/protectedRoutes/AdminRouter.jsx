import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import PropType from "prop-types";
import { useSnackbar } from "notistack";

const AdmiiRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!user && !loading) {
      enqueueSnackbar("You are not authorized to view this page", {
        variant: "error",
      });
    }
  }, [user, loading, enqueueSnackbar]);

  if (loading) {
    return <Loader />;
  }
  if (user && user.role === "admin") {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdmiiRouter;

AdmiiRouter.propTypes = {
  children: PropType.node.isRequired,
};
