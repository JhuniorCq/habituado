import type { ReactNode } from "react";
import background from "../assets/images/background.jpg";

interface BaseFundProps {
  children: ReactNode;
}

const BaseFund = ({ children }: BaseFundProps) => {
  return (
    <section className="w-full min-h-screen relative">
      <div className="min-h-screen flex px-8 py-12 relative z-10">
        {children}
      </div>
      <img
        src={background}
        alt="Background"
        className="w-full h-full absolute inset-0 object-cover"
      />
    </section>
  );
};

export default BaseFund;
