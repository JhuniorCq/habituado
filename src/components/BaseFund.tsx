import type { ReactNode } from "react";
import background from "../assets/images/background.jpg";
import logo from "../assets/images/habituado.png";
import { Link } from "react-router-dom";

interface BaseFundProps {
  children: ReactNode;
  title: string;
  buttonName: string;
  redictTo: string;
}

const BaseFund = ({ children, title, buttonName, redictTo }: BaseFundProps) => {
  return (
    <section className="w-full min-h-screen relative">
      <div className="min-h-screen flex px-8 py-12 relative z-10">
        <div className="w-full flex flex-col justify-center items-center gap-7">
          <img src={logo} alt="Habituado" className="h-16" />

          <div className="bg-off-white p-6 flex flex-col gap-4 rounded shadow-md">
            <div className="border border-taupe-light px-6 py-1">
              <h1 className="w-full text-center border">{title}</h1>
            </div>

            {children}
          </div>

          <Link
            to={redictTo}
            className="bg-taupe transition-colors duration-300 ease-in-out hover:bg-taupe-dark text-white px-4 py-3 rounded text-sm text-center"
          >
            {buttonName}
          </Link>
        </div>
      </div>

      {/*  */}
      <img
        src={background}
        alt="Background"
        className="w-full h-full absolute inset-0 object-cover"
      />
    </section>
  );
};

export default BaseFund;
