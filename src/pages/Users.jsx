import axios from "axios";

const Users = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const getAllUsers = async () => {
    const res = await axios.get(
      "https://aporvis-server.vercel.app/api/admin/users",
      config
    );
    console.log(res);
  };

  getAllUsers();
  return <div>Users</div>;
};

export default Users;
