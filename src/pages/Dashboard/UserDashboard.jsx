/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import UserGreeting from "../../components/UserGreeting";
import { IoEyeOutline, IoTrash } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("incomplete"); // State to track active status

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <section>
      <UserGreeting />
      <div className="px-4 xl:px-24 justify-center mt-8">
        <div className="flex flex-col md:flex-row md:w-full justify-between overflow-x-auto mb-2 space-y-2 md:space-y-0">
          <div className="flex flex-wrap md:flex-nowrap space-x-1">
            <button
              className={`btn ${
                status === "complete"
                  ? "bg-[#191D31] text-[#E8E6EA] hover:bg-[#191D31]"
                  : ""
              }`}
              onClick={() => handleStatusChange("complete")}
            >
              Complete (1)
            </button>
            <button
              className={`btn ${
                status === "pending"
                  ? "bg-[#191D31] text-[#E8E6EA] hover:bg-[#191D31]"
                  : ""
              }`}
              onClick={() => handleStatusChange("pending")}
            >
              Pending (1)
            </button>
          </div>
          <div className="flex flex-wrap md:flex-nowrap space-x-1">
            <button
              className="btn hover:text-[#E8E6EA] hover:bg-[#191D31] transition-all duration-300 ease-in-out"
              onClick={() => navigate("/new-application")}
            >
              New Application
            </button>
            <button className="btn hover:text-[#E8E6EA] hover:bg-[#191D31] transition-all duration-300 ease-in-out">
              Book Appointment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="text-[#191D31] font-bold">
                <th>Applicant's name</th>
                <th>Nationality</th>
                <th>Passport No.</th>
                <th>Application ID</th>
                <th>Reference ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-[#191D31]">
              <tr className={status === "complete" ? "" : "hidden"}>
                <td>Mr. Samuel Adekunle</td>
                <td>Nigerian</td>
                <td>100001</td>
                <td>001</td>
                <td>Ref11</td>
                <td>
                  <div className="flex space-x-1">
                    <IoEyeOutline />
                    <IoTrash className="text-red-600" />
                  </div>
                </td>
              </tr>
              <tr className={status === "pending" ? "" : "hidden"}>
                <td>Miss Uba Chinyere</td>
                <td>Nigerian</td>
                <td>100003</td>
                <td>003</td>
                <td>Ref13</td>
                <td>
                  <div className="flex space-x-1">
                    <FaRegEdit />
                    <FiRefreshCw />
                    <IoTrash className="text-red-600" />
                  </div>
                </td>
              </tr>
              <tr className={status === "complete" ? "" : "hidden"}>
                <td>Miss Gobaye Chinyere</td>
                <td>Nigerian</td>
                <td>100003</td>
                <td>003</td>
                <td>Ref13</td>
                <td>
                  <div className="flex space-x-1">
                    <IoEyeOutline />
                    <IoTrash className="text-red-600" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
