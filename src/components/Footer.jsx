const year = new Date().getFullYear();
const Footer = () => {
  return (
    <section className="w-full text-center fixed bottom-0 left-0 right-0">
      <p>Copyright © {year} - All right reserved</p>
    </section>
  );
};

export default Footer;
