/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";
import UserGreeting from "../../components/UserGreeting";
import { IoTrash } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("approved"); // State to track active status
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    fetchDashboardData();
  }, []); // Fetch data only once when component mounts

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const authToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "https://aporvis-server.vercel.app/api/user/dashboard",
        config
      );
      if (res.data.success) {
        // console.log(applications);
        const { pending, rejected, approved } = res.data;
        // Mapping over each array and adding the "status" field
        const pendingWithStatus = pending.map((app) => ({
          ...app,
          status: "pending",
        }));
        const rejectedWithStatus = rejected.map((app) => ({
          ...app,
          status: "rejected",
        }));
        const approvedWithStatus = approved.map((app) => ({
          ...app,
          status: "approved",
        }));

        // Combine all applications
        const allApplications = [
          ...pendingWithStatus,
          ...rejectedWithStatus,
          ...approvedWithStatus,
        ];
        setApplications(allApplications);
      } else {
        enqueueSnackbar(`An error occurred: ${res.data.message}`, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(`An error occurred: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const deleteApplication = async (referenceNumber) => {
    try {
      const res = await axios.delete(
        `https://aporvis-server.vercel.app/api/user/application?referenceNumber=${referenceNumber}`,
        config
      );
      if (res.data.success) {
        enqueueSnackbar(`Application deleted successfully`, {
          variant: "success",
        });
        fetchDashboardData();
      } else {
        enqueueSnackbar(`Failed to delete application: ${res.data.message}`, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        `An error occurred while deleting application: ${error.message}`,
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <section>
      <UserGreeting />
      <div className="px-4 xl:px-24 justify-center mt-8">
        <div className="flex flex-col md:flex-row md:w-full justify-between overflow-x-auto mb-2 space-y-2 md:space-y-0">
          {/* Status buttons */}
          <div className="flex flex-wrap md:flex-nowrap space-x-1">
            <button
              className={`btn ${
                status === "approved"
                  ? "bg-[#191D31] text-[#E8E6EA] hover:bg-[#191D31]"
                  : ""
              }`}
              onClick={() => handleStatusChange("approved")}
            >
              Approved (
              {applications.filter((app) => app.status === "approved").length})
            </button>
            <button
              className={`btn ${
                status === "rejected"
                  ? "bg-[#191D31] text-[#E8E6EA] hover:bg-[#191D31]"
                  : ""
              }`}
              onClick={() => handleStatusChange("rejected")}
            >
              Rejected (
              {applications.filter((app) => app.status === "rejected").length})
            </button>
            <button
              className={`btn ${
                status === "pending"
                  ? "bg-[#191D31] text-[#E8E6EA] hover:bg-[#191D31]"
                  : ""
              }`}
              onClick={() => handleStatusChange("pending")}
            >
              Pending (
              {applications.filter((app) => app.status === "pending").length})
            </button>
          </div>
          {/* Action buttons */}
          <div className="flex flex-wrap md:flex-nowrap space-x-1">
            <button
              className="btn hover:text-[#E8E6EA] hover:bg-[#191D31] transition-all duration-300 ease-in-out"
              onClick={() => navigate("/new-application")}
            >
              New Application
            </button>
            <button
              className="btn hover:text-[#E8E6EA] hover:bg-[#191D31] transition-all duration-300 ease-in-out"
              onClick={() => navigate("/book-appointment")}
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Applications table */}
        <div className="overflow-x-auto">
          <table className="table table-md">
            <thead>
              <tr className="text-[#191D31] text-[15px] font-bold">
                <th>Appointment Date</th>
                <th>Visa Type</th>
                <th>Processing Country</th>
                <th>Reference ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-[#191D31]">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className={status === app.status ? "" : "hidden"}
                >
                  <td>
                    {app.appointmentDate
                      ? app.appointmentDate.substring(0, 10)
                      : (() => {
                          enqueueSnackbar(
                            `Book an appointment now for application with ${app.referenceNumber}`,
                            {
                              variant: "warning",
                            }
                          );
                          return "";
                        })()}
                    {/* error dey here, come back to it later */}
                  </td>
                  <td>{app.visaType}</td>
                  <td>{app.processingCountry}</td>
                  <td>{app.referenceNumber}</td>
                  <td>
                    <div className="flex space-x-1">
                      {app.status === "pending" && (
                        <FiRefreshCw
                          className="cursor-pointer"
                          onClick={() => location.reload()}
                        />
                      )}
                      <IoTrash
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteApplication(app.referenceNumber)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
