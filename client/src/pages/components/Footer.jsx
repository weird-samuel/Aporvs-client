import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <section className="text-black bg-gray-400 max-w-screen-2xl container mx-auto px-4 py-4 xl:px-24">
      <div className="flex justify-between">
        <p className="flex items-center">
          <FaRegCopyright className="mr-1" />
          {year}, APORVIS. All rights reserved.
        </p>
        <p>
          PROJECT BY: <span className="font-bold">SAMUEL & CHINYERE</span>
        </p>
      </div>
    </section>
  );
};

export default Footer;
