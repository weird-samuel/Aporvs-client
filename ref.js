const renderCards = () => {
  if (!data) return null;

  return (
    data.allApplications.map((application, index) => (
      <div key={index} className="card">
        <h2>Visa Type: {application.visaType}</h2>
        <p>Processing Country: {application.processingCountry}</p>
        <p>Reference Number: {application.referenceNumber}</p>
        {/* <p>Status: {application.}</p> */}
        <p>
          Appointment Date:{" "}
          {new Date(application.appointmentDate).toLocaleDateString()}
        </p>
      </div>
    )),
    data.allAdmins.map((admin, index = index + 1) => (
      <div key={index} className="card">
        <h2 className="capitalize">
          Admin {index}: {admin.firstName + " " + admin.lastName}
        </h2>
        <p>Phone Number: {admin.phoneNumber}</p>
      </div>
    )),
    data.allAppointments.map((appointment, index) => (
      <div key={index} className="card">
        <h2 className="capitalize">
          Applicant's Name:{" "}
          {appointment.applicant.title + " " + appointment.applicant.firstName}
        </h2>
        <p>Applicant's Email: {appointment.applicant.email}</p>
        <p className="capitalize">
          {" "}
          Applicant's Mission: {appointment.mission}
        </p>
      </div>
    )),
    data.allUsers.map((user, index) => (
      <div className="card" key={index}>
        <h2 className="capitalize">
          User's Full Name:
          {" " + user.title + " " + user.firstName + ", " + user.lastName}
        </h2>
      </div>
    ))
  );
};

return <div className="card-container">{renderCards()}</div>;
