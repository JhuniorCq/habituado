import BaseFund from "../components/BaseFund";

const Home = () => {
  return (
    <BaseFund
      title="DATOS EN TIEMPO REAL"
      buttonName="VER HISTORIAL DE ALERTAS"
      redictTo="/alert-history"
    >
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
    </BaseFund>
  );
};

export default Home;
