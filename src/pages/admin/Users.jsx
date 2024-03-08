/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IoTrash } from "react-icons/io5";

const Users = () => {
  const [users, setUsers] = useState();
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
      // const filteredUsers = res.data.users.filter(
      //   (user) => user.role === "applicant"
      // );

      // setUsers(filteredUsers);
      // console.log(users);
      if (res.data.error) {
        enqueueSnackbar(res.data.error, { variant: "error" });
      } else {
        return;
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

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `https://aporvis-server.vercel.app/api/admin/user?id=${id}`,
        config
      );
      if (res.data.success) {
        enqueueSnackbar(`User deleted successfully`, {
          variant: "success",
        });
        getAllUsers();
      } else {
        enqueueSnackbar(`Failed to delete user: ${res.data.message}`, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        `An error occurred while deleting user: ${error.message}`,
        {
          variant: "error",
        }
      );
    }
  };

  getAllUsers();
  return (
    <section className="overflow-x-auto">
      <div className="mb-6">
        <h2 className="font-bold text-xl">All Users:</h2>
      </div>
      <table className="table table-lg">
        <thead>
          <tr className="text-[#191D31] text-[15px] font-bold">
            <th>User's Full Name</th>
            <th>Passport Number</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user, index) => (
                <tr key={index} className="capitalize">
                  <td className="capitalize">
                    {user.title
                      ? `${user.title} ${user.firstName}, ${user.lastName}`
                      : "Not Provided by user"}
                  </td>
                  <td className="capitalize">{`${user.passportNumber}`}</td>
                  <td className="capitalize">
                    {user.phoneNumber ? `${user.phoneNumber}` : "null"}
                  </td>
                  <td className="lowercase">{`${user.email}`}</td>
                  <td className="lowercase">{`${user.role}`}</td>
                  <td>
                    <IoTrash
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteUser(user._id)}
                    />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
