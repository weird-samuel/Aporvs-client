import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

const UserGreeting = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [hour, setHour] = useState("");

  useEffect(() => {
    if (!user.image && location.pathname === "/dashboard") getHour();
  }, [user]);

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
      ) : (
        <h2>Appointment Booking</h2>
      )}
    </section>
  );
};

export default UserGreeting;
