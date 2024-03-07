import { useState } from "react";
import UserGreeting from "../../components/UserGreeting";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    referenceNumber: "",
    appointmentDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const authToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://aporvis-server.vercel.app/api/user/bookappointment",
        formData,
        config
      );
      enqueueSnackbar(`Reservation Made, ${response.data.message}`, {
        variant: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      enqueueSnackbar(`Invalid reference number`, { variant: "error" });
    }
  };
  return (
    <section>
      <UserGreeting />
      <div className="p-4">
        <section className="border border-[#191D31] rounded-lg p-4 max-w-md flex mx-auto mt-10">
          <form method="post" onSubmit={handleSubmit} className="w-full m-auto">
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="referenceNumber"
              >
                Reference Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                name="referenceNumber"
                id="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="appointmentDate"
              >
                Appointment Date
                <input
                  type="date"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  name="appointmentDate"
                  id="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="submit"
                value={"Continue"}
                className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
              />
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default BookAppointment;
