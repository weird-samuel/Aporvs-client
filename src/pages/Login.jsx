import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
// import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  // console.log(user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State variable to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Set isSubmitting to true when the form is being submitted
    setIsSubmitting(true);
    await login(formData);
    // Set isSubmitting to false after login attempt is complete
    setIsSubmitting(false);
  };

  return user ? (
    user.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/dashboard" />
    )
  ) : (
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
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value={isSubmitting ? "Logging in..." : "Log in"}
                className={`btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA] ${
                  isSubmitting ? "cursor-not-allowed opacity-90" : ""
                }`}
                disabled={isSubmitting}
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
