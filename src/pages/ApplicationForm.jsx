import UserGreeting from "../components/UserGreeting";
import UserDetailsForm from "../components/UserDetailsForm";

const ApplicationForm = () => {
  return (
    <div>
      <UserGreeting />
      <section className="w-full text-[#E8E6EA] py-2 px-8 xl:px-24">
        <div className="w-full mx-auto py-4 text-[#191D31]">
          <div className="text-[#191D31] mt-3 mb-5 font-semibold">
            <h2>Please Fill the form to get your application started !</h2>
          </div>
          <UserDetailsForm />
        </div>
      </section>
    </div>
  );
};

export default ApplicationForm;
