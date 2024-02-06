const DescriptionCards = () => {
  return (
    <section className="absolute top-[50%] px-4 xl:px-24">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">Icon and Yaps here</div>
          <div className="pt-4 pb-2 bg-[#E8E8E8] px-10 py-5 text-black">
            <p>We need to know who we are giving access to our portal.</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">Icon and Yaps here</div>
          <div className="pt-4 pb-2 bg-[#E8E8E8] px-10 py-5 text-black">
            <p>We need to get information for a visa to be processed.</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">Icon and Yaps here</div>
          <div className="pt-4 pb-2 bg-[#E8E8E8] px-10 py-5 text-black">
            <p>We charge you because we have to keep the firm running.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionCards;
