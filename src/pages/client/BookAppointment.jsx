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

  const [isSubmitting, setIsSubmitting] = useState(false); // State variable to track form submission status

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
    setIsSubmitting(true); // Set isSubmitting to true when the form is being submitted

    try {
      const response = await axios.post(
        "https://aporvis-server.vercel.app/api/user/bookappointment",
        formData,
        config
      );
      enqueueSnackbar(`Reservation Made, ${response.data.message}`, {
        variant: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    } catch (error) {
      enqueueSnackbar(`Invalid reference number`, { variant: "error" });
    } finally {
      setIsSubmitting(false); // Set isSubmitting to false after form submission attempt is complete
    }
  };

  return (
    <section>
      <UserGreeting />
      <div className="p-4">
        <section className="border border-[#191D31] rounded-lg p-4 max-w-md flex mx-auto mt-10">
          <form method="post" onSubmit={handleSubmit} className="w-full m-auto">
            {/* Form fields */}
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
                value={isSubmitting ? "Submitting..." : "Continue"} // Change button text based on submission status
                className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
                disabled={isSubmitting} // Disable button while form is being submitted
              />
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default BookAppointment;
