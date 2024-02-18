import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
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
        navigate("/");
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
        navigate("/");
      })
      .catch((err) => {
        alert("Error" + err.message);
      });
  };

  return (
    <div className="max-w-md shadow bg-base-200 w-full mx-auto flex items-center justify-center my-10 md:my-20">
      <div className="modal-action flex flex-col mt-0 justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Input Details to Log in</h3>
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
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-4">
            <input type="submit" value={"Login"} className="btn btn-primary" />
          </div>
          <p className="text-center my-2">
            No account?
            <Link className="underline hover:text-gray-500 ml-1" to={"/signup"}>
              Create One!
            </Link>
          </p>
          <Link
            to={"/"}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        <div className="text-center space-x-3 mb-5">
          <button className="btn bg-base-300 hover:text-white transition-all duration-500 btn-circle">
            <FaGoogle onClick={handleLogin} />
          </button>
          <button className="btn bg-base-300 hover:text-white transition-all duration-500 btn-circle">
            <FaFacebook />
          </button>
          <button className="btn bg-base-300 hover:text-white transition-all duration-500 btn-circle">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
