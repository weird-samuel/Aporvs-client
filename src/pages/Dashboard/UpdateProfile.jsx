import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile(name, photoURL)
      .then(() => {
        enqueueSnackbar("Update profile successfully", {
          variant: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        enqueueSnackbar("Error" + err.message, {
          variant: "error",
        });
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full justify-between items-center my-5">
            <h2 className="card-title">Update Your Profile</h2>

            <Link to={"/dashboard"} className="btn btn-sm btn-circle btn-ghost">
              ✕
            </Link>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              required
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="photoURL "
              className="input input-bordered"
              required
              {...register("photoURL", { required: true })}
            />
            {/* <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-ghost hover:bg-[#191D31] bg-[#191D31] text-[#E8E6EA]">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
