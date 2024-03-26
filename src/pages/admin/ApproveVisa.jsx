import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const ApproveVisa = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPendingApplications = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
          "https://aporvis-server.vercel.app/api/admin/pendingapplications",
          config
        );
        setPendingApplications(response.data.pendingApplications);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    getPendingApplications();
  }, []);

  const handleApproveReject = async (referenceNumber, action) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          referenceNumber,
          action,
        },
      };

      const response = await axios.patch(
        "https://aporvis-server.vercel.app/api/admin/application",
        {},
        config
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      setPendingApplications(response.data.updatedPendingApplications);
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the request"
      );
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-bold text-xl capitalize">Approve Visa</h2>
      </div>
      {error && <p>{error}</p>}
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr className="text-[#191D31] text-[15px] font-bold">
              <th>Id</th>
              <th>Reference Number</th>
              <th>Processing Country</th>
              <th>Visa Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications &&
              pendingApplications.map((user, index) => (
                <tr key={index} className="capitalize">
                  <td>{user._id}</td>
                  <td className="capitalize">
                    {user ? `${user.referenceNumber}` : "Not Provided by user"}
                  </td>
                  <td className="capitalize">{`${user.processingCountry}`}</td>
                  <td className="capitalize">
                    {user ? `${user.visaType}` : "null"}
                  </td>
                  <td className="flex gap-4">
                    <button
                      className="text-green-600 cursor-pointer btn"
                      onClick={() =>
                        handleApproveReject(user.referenceNumber, "approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="text-red-600 cursor-pointer btn"
                      onClick={() =>
                        handleApproveReject(user.referenceNumber, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApproveVisa;
