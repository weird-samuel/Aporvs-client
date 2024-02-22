// import { useLocation } from "react-router-dom";
import UserGreeting from "../components/UserGreeting";

const ApplicationForm = () => {
  //   const location = useLocation();
  return (
    <div>
      <UserGreeting />
      <section className="w-full text-[#E8E6EA] px-8 xl:px-24">
        <div className="text-[#191D31] mt-3 mb-5">
          <h2>Please Fill the form to get your application started</h2>
        </div>
        <ul className="steps">
          <li data-content="" className="step step-neutral">
            Step 1
          </li>
          <li data-content="!" className="step step-neutral">
            Step 2
          </li>
          <li data-content="✓" className="step step-neutral">
            Step 3
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ApplicationForm;
