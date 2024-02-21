import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { signupWithGoogle, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    login(email, password)
      .then((res) => {
        const user = res.user;
        enqueueSnackbar("Welcome user with email " + user.email, {
          variant: "success",
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        enqueueSnackbar("Error: " + err.message, { variant: "error" });
      });
  };

  // google auth
  const handleLogin = () => {
    signupWithGoogle()
      .then((res) => {
        const user = res.user;
        enqueueSnackbar("Welcome " + user.displayName, { variant: "success" });
        navigate("/dashboard");
      })
      .catch((err) => {
        enqueueSnackbar("Error" + err.message, { variant: "error" });
      });
  };

  return (
    <section className="max-h-screen">
      <div className="my-20">
        <div className="w-[350px] h-[500px] bg-white p-5 m-auto rounded-lg shadow-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
            method="dialog"
          >
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
                {...register("email")}
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
                {...register("password")}
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

            <div className="form-control mt-4">
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
          <div className="text-center">
            <button className="btn bg-base-300 hover:text-white transition-all duration-500 btn-circle">
              <FcGoogle onClick={handleLogin} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
