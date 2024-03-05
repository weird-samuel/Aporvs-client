import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const AdminDashboard = () => {
  const [ip, setIp] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        enqueueSnackbar("Error fetching IP address", { variant: "error" });
      }
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const getAdminDashboard = async () => {
      const res = await axios.get(
        "https://aporvis-server.vercel.app/api/admin/dashboard",
        config
      );
      console.log(res);
    };

    getAdminDashboard();

    fetchIp();
  }, [enqueueSnackbar]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {/*  */}
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] m-4">
        <img className="w-[310px] h-[220px]" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">{ip}</p>
        </div>
      </div>
      {/*  */}
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] m-4">
        <img className="w-[310px] h-[220px]" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">{ip}</p>
        </div>
      </div>
      {/*  */}
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] m-4">
        <img className="w-[310px] h-[220px]" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">{ip}</p>
        </div>
      </div>
      {/*  */}
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] m-4">
        <img className="w-[310px] h-[220px]" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">{ip}</p>
        </div>
      </div>
      {/*  */}
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] m-4">
        <img className="w-[310px] h-[220px]" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">{ip}</p>
        </div>
      </div>
      {/*  */}
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] m-4">
        <img className="w-[310px] h-[220px]" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">{ip}</p>
        </div>
      </div>
      {/*  */}
    </section>
  );
};

export default AdminDashboard;
