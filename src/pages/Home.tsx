import BaseFund from "../components/BaseFund";
import logo from "../assets/images/habituado.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <BaseFund>
      <div className="w-full flex flex-col justify-center items-center gap-7">
        <img src={logo} alt="Habituado" className="h-16" />

        <div className="bg-off-white p-6 flex flex-col gap-4 rounded shadow-md">
          <div className="border border-taupe-light px-6 py-1">
            <h1 className="w-full text-center border">DATOS EN TIEMPO REAL</h1>
          </div>

          <div className="w-64 overflow-auto pb-4 min-[480px]:w-auto min-[480px]:pb-0">
            <table className="table-auto border-collapse border border-taupe-dark text-sm min-[480px]:text-base">
              <thead>
                <tr className="bg-white">
                  <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                    Sensor
                  </th>
                  <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                    Valor actual
                  </th>
                  <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Filas dinámicas */}
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Temperatura
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    28.4 °C
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Alta
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Link
          to="/alert-history"
          className="bg-taupe transition-colors duration-300 ease-in-out hover:bg-taupe-dark text-white px-4 py-3 rounded text-sm text-center"
        >
          VER HISTORIAL DE ALERTAS
        </Link>
      </div>
    </BaseFund>
  );
};

export default Home;
