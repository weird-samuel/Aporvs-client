import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const Appointments = () => {
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const getAllAppointments = async () => {
    try {
      const response = await axios.get(
        "https://aporvis-server.vercel.app/api/admin/dashboard",
        config
      );
      // console.log(appointmentInfo);
      const filteredAppointments = response.data.allAppointments.filter(
        (appointment) => appointment.status !== "approved"
      );
      setAppointmentInfo(filteredAppointments);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(`An error occurred: ${error.message}`, {
          variant: "error",
        });
      }
    }
  };

  getAllAppointments();

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-bold text-xl">All Appointments:</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr className="text-[#191D31] text-[15px] font-bold">
              <th>Reference Number</th>
              <th>Processing Country</th>
              <th>Appointment Date</th>
              <th>Mission</th>
              <th>Visa Type</th>
              <th>Visa Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointmentInfo &&
              appointmentInfo.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.referenceNumber}</td>
                  <td>{appointment.processingCountry}</td>
                  <td>{appointment.appointmentDate.substring(0, 10)}</td>
                  <td className="capitalize">{appointment.mission}</td>
                  <td className="capitalize">{appointment.visaType}</td>
                  <td>{appointment.visaClass}</td>
                  <td className="capitalize">{appointment.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Appointments;
