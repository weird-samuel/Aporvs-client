import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { enqueueSnackbar } from "notistack";

const Signup = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const { createUser } = useContext(AuthContext);
  const { signupWithGoogle } = useContext(AuthContext);

  // redirect users
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        enqueueSnackbar(
          "Account for user with email " + user.email + " created successfully"
        ),
          { variant: "success" };
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error" + err.message), { variant: "error" };
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
        enqueueSnackbar("Error: " + err.message, { variant: "error" });
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
          <h3 className="font-bold text-lg">Create An account</h3>
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
          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Sign Up"}
              className="btn btn-primary"
            />
          </div>
          <p className="text-center my-2">
            Have an account?
            <Link to={"/login"} className="underline hover:text-gray-500 ml-1">
              Log in!
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

export default Signup;
