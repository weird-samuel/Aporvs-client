import { CiEdit, CiMoneyBill, CiUser } from "react-icons/ci";
const DescriptionCards = () => {
  return (
    <section className="absolute top-[50%] px-4 xl:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="home-card">
          <div className="home-card-header">
            <CiUser className="text-3xl mr-3" />
            Icon and Yaps here
          </div>
          <div className="home-card-text">
            <p>We need to know who we are giving access to our portal.</p>
          </div>
        </div>
        <div className="home-card">
          <div className="home-card-header">
            <CiEdit className="text-3xl mr-3" />
            Icon and Yaps here
          </div>
          <div className="home-card-text">
            <p>We need to get information for a visa to be processed.</p>
          </div>
        </div>
        <div className="home-card">
          <div className="home-card-header">
            <CiMoneyBill className="text-3xl mr-3" />
            Icon and Yaps here
          </div>
          <div className="home-card-text">
            <p>We charge you because we have to keep the firm running.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionCards;
