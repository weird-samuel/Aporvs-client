import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    loading: true,
    user: null,
  });

  const updateUserProfile = async (data) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.patch(
        "https://aporvis-server.vercel.app/api/user/updateprofile",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setAuthInfo({
          loading: false,
          user: response.data.user,
        });
        console.log(authInfo.user);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
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

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authInfo, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
