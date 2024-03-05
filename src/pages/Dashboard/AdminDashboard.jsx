/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const getAdminDashboard = async () => {
      try {
        const res = await axios.get(
          "https://aporvis-server.vercel.app/api/admin/dashboard",
          config
        );
        setData(res.data);
      } catch (error) {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      }
    };

    getAdminDashboard();
  }, [enqueueSnackbar]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="grid grid-cols-2 gap-6 md:gap-12">
        <div
          className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
          onClick={() => navigate("/admin/dashboard/appointments")}
        >
          <h2 className="text-xl font-semibold mb-2">Appointments</h2>
          <p className="text-gray-600">
            Appointment Count : {data ? data.allAppointments.length : ""}
          </p>
        </div>

        <div
          className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
          onClick={() => navigate("/admin/dashboard/applications")}
        >
          <h2 className="text-xl font-semibold mb-2">Applications</h2>
          <p className="text-gray-600">
            Application count: {data ? data.allApplications.length : ""}
          </p>
        </div>

        <div
          className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
          onClick={() => navigate("/admin/dashboard/admins")}
        >
          <h2 className="text-xl font-semibold mb-2">All Admins</h2>
          <p className="text-gray-600">
            Admin count: {data ? data.allAdmins.length : ""}
          </p>
        </div>

        <div
          className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
          onClick={() => navigate("/admin/dashboard/users")}
        >
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <p className="text-gray-600">
            User count: {data ? data.allUsers.length : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
