import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const PendingApplications = () => {
  const [userInfo, setUserInfo] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getPendingApplications = async () => {
    try {
      const response = await axios.get(
        "https://aporvis-server.vercel.app/api/admin/pendingapplications",
        config
      );
      setUserInfo(response.data.pendingApplications);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(`An error occurred ${error.message}`, {
          variant: "error",
        });
      }
    }
  };

  getPendingApplications();

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-bold text-xl">All Pendng Applications:</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr className="text-[#191D31] text-[15px] font-bold">
              <th>Reference Number</th>
              <th>Processing Country</th>
              <th>Appointment Date</th>
              <th>Visa Type</th>
            </tr>
          </thead>
          <tbody>
            {userInfo &&
              userInfo.map((user, index) => (
                <tr key={index}>
                  <td>{user.referenceNumber}</td>
                  <td>{user.processingCountry}</td>
                  <td>
                    {user.appointmentDate &&
                      user.appointmentDate.substring(0, 10)}
                  </td>
                  <td>{user.visaType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PendingApplications;
