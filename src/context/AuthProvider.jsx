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
        // console.log(authInfo.user);
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
      localStorage.removeItem("userId");
      setAuthInfo({
        loading: false,
        user: null,
      });
    } catch (error) {
      enqueueSnackbar("Logout error:", error, { variant: "error" });
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "https://aporvis-server.vercel.app/api/user/login",
        formData
      );
      if (res.data.error) {
        enqueueSnackbar(res.data.error, { variant: "error" });
      } else {
        console.log(res.data);
        // Store the token in localStorage
        localStorage.setItem("accessToken", res.data.accessToken);
        enqueueSnackbar("Login successful", { variant: "success" });
        setAuthInfo({
          loading: false,
          user: res.data.user, // Assuming you're returning user data after login
        });
        console.log(authInfo);
        localStorage.setItem("userId", res.data.user.id);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("An error occurred while logging in.", {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...authInfo, login, logout, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
