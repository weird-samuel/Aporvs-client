import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { enqueueSnackbar } from "notistack";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const { changePassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return; // If already submitting, ignore duplicate submissions
    setIsSubmitting(true);
    try {
      // console.log(data);
      await changePassword(data);
      enqueueSnackbar("Password changed successfully", {
        variant: "success",
      });
      navigate("/dashboard");
    } catch (err) {
      enqueueSnackbar("Error changing password: " + err.message, {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-h-screen">
      <div className="my-20">
        <div className="w-[350px] bg-white px-5 py-10 m-auto rounded-lg shadow-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
            method="dialog"
          >
            <div className="flex w-full justify-between items-center my-5">
              <h3 className="font-bold text-2xl">Change Password</h3>

              <Link
                to={"/dashboard"}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </Link>
            </div>
            <div className="form-control mt-4 space-y-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="oldPassword"
                className="input input-bordered"
                {...register("oldPassword")}
              />
              <input
                type="password"
                placeholder="newPassword"
                className="input input-bordered"
                {...register("newPassword")}
              />
            </div>
            <div className="form-control mt-4">
              <input
                type="submit"
                value={"Change Password"}
                className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
                disabled={isSubmitting} // Disable the button while submitting
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
