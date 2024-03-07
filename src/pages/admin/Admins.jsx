import axios from "axios";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { IoCheckmark, IoClose } from "react-icons/io5";

const ManageAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "https://aporvis-server.vercel.app/api/admin/users",
        config
      );
      setUsers(res.data.users);

      if (res.data.error) {
        enqueueSnackbar(res.data.error, { variant: "error" });
      }
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

  const changeUserRole = async (userId, newRole) => {
    try {
      const res = await axios.patch(
        `https://aporvis-server.vercel.app/api/admin/user?id=${userId}`,
        { role: newRole },
        config
      );

      if (res.data.success) {
        enqueueSnackbar(res.data.message, { variant: "success" });
        // Update the user's role locally
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        `An error occurred while changing user role ${error.message}`,
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <section className="overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr className="text-[#191D31] text-[15px] font-bold">
            <th>User's Full Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="capitalize">
              <td className="capitalize">
                {user.title
                  ? `${user.title} ${user.firstName}, ${user.lastName}`
                  : "Not Provided by user"}
              </td>
              <td className="capitalize">
                {user.phoneNumber ? `${user.phoneNumber}` : "null"}
              </td>
              <td className="lowercase">{`${user.email}`}</td>
              <td className="lowercase">{`${user.role}`}</td>
              <td className="text-center items-center">
                <button
                  className="btn"
                  onClick={() =>
                    changeUserRole(
                      user._id,
                      user.role === "admin" ? "applicant" : "admin"
                    )
                  }
                >
                  {user.role === "admin" ? "Demote" : "Promote"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ManageAdmin;
