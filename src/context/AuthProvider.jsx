import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    loading: true,
    user: null,
  });
  console.log(authInfo);

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get(
        "https://aporvis-server.vercel.app/api/user/checkauth",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAuthInfo({
        loading: false,
        user: response.data.user,
      });
    } catch (error) {
      setAuthInfo({
        loading: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        enqueueSnackbar("Access token not found", { variant: "error" });
      }

      await axios.get("https://aporvis-server.vercel.app/api/user/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem("accessToken");
      setAuthInfo({
        loading: false,
        user: null,
      });
    } catch (error) {
      enqueueSnackbar("Logout error:", error, { variant: "error" });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
