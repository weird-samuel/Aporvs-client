import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { enqueueSnackbar } from "notistack";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();

  const { sendPasswordResetEmailToUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    // console.log(email, password);
    sendPasswordResetEmailToUser(email)
      .then(() => {
        enqueueSnackbar("Password reset email sent successfully", {
          variant: "success",
        });
        navigate("/login");
      })
      .catch((err) => {
        enqueueSnackbar("Error sending password reset email: " + err.message, {
          variant: "error",
        });
      });
  };

  return (
    <section className="max-h-screen">
      <div className="my-20">
        <div className="w-[350px] h-[350px] bg-white p-5 m-auto rounded-lg shadow-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
            method="dialog"
          >
            <div className="flex w-full justify-between items-center my-5">
              <h3 className="font-bold text-2xl">Reset Password</h3>

              <Link to={"/"} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </Link>
            </div>
            <div className="form-control mt-11">
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
            <div className="form-control mt-4">
              <input
                type="submit"
                value={"Send Email"}
                className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
