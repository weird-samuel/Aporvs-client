import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://aporvis-server.vercel.app/api/user/login",
        formData
      );
      if (res.data.error) {
        enqueueSnackbar(res.data.error, { variant: "error" });
      } else {
        enqueueSnackbar("Login successful", { variant: "success" });
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("An error occurred while logging in.", {
          variant: "error",
        });
      }
    }
  };

  return (
    <section className="max-h-screen">
      <div className="my-20">
        <div className="w-[350px] h-[500px] bg-white p-5 m-auto rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="w-full" method="dialog">
            <div className="flex w-full justify-between items-center my-5">
              <h3 className="font-bold text-2xl">Login</h3>

              <Link to={"/"} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </Link>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label className="label mt-1">
                <Link
                  to={"/reset-password"}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value={"Log in"}
                className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
              />
            </div>
            <p className="text-center my-4">
              No account?
              <Link
                className="underline hover:text-gray-500 ml-1"
                to={"/signup"}
              >
                Create One!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
