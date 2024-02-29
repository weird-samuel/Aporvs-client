import axios from "axios";

export const checkAuth = async () => {
  try {
    const isLoggedIn = await axios.get(
      "https://aporvis-server.vercel.app/api/user/checkauth",
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return isLoggedIn.data;
  } catch (error) {
    console.log(error.res.data);
  }
};
