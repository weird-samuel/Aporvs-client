import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
// import { enqueueSnackbar } from "notistack";

const UserGreeting = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(user);
  const [hour, setHour] = useState("");

  useEffect(() => {
    if (user.firstName) {
      null;
    } else {
      enqueueSnackbar("Please update your profile to continue", {
        variant: "warning",
      });
      navigate("/update-profile");
    }
    getHour();
  }, [user, location.pathname, navigate]);

  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 1 && hour < 12) {
      setHour("morning");
    } else if (hour >= 12 && hour < 16) {
      setHour("afternoon");
    } else {
      setHour("evening");
    }
  };

  return (
    <section className="w-full bg-[#191D31] text-[#E8E6EA] px-8 py-2 xl:px-24 flex justify-between">
      <h2 className="capitalize">
        Good {hour}, {user.firstName}
      </h2>
      {location.pathname === "/dashboard" ? (
        <h2>Dashboard</h2>
      ) : location.pathname === "/new-application" ? (
        <h2>Application Page</h2>
      ) : location.pathname === "/book-appointment" ? (
        <h2>Appointment Booking</h2>
      ) : (
        <h2>Admin View</h2>
      )}
    </section>
  );
};

export default UserGreeting;
