import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";

const UserGreeting = () => {
  const { user } = useContext(AuthContext);
  const [hour, setHour] = useState("");

  useEffect(() => {
    getHour();
  }, []);
  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) {
      setHour("morning");
    } else if (hour >= 12 && hour < 18) {
      setHour("afternoon");
    } else {
      setHour("evening");
    }
  };

  return (
    <section className="w-full bg-[#191D31] text-[#E8E6EA] px-4 py-2 xl:px-24">
      <h2>
        Good {hour} {user.displayName}
      </h2>
    </section>
  );
};

export default UserGreeting;
