import { useEffect, useState } from "react";
import BaseFund from "../components/BaseFund";
import type {
  ClutterDetection,
  ClutterDetectionStatuses,
  DrawerStatuses,
  LightLevel,
  LightLevelStatuses,
  Sensors,
  TemperatureStatuses,
} from "../utils/types";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../libs/firebase";

const Home = () => {
  const [sensors, setSensors] = useState<Sensors | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dbRef = ref(realtimeDB, "sensors");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setSensors(data);
      } else {
        setError("Ocurrió un problema al obtener los estados de los sensores.");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Estados de los sensores
  const temperatureState = (temperature: number): TemperatureStatuses =>
    temperature < 20 ? "baja" : temperature < 32 ? "normal" : "alta";

  const humidityState = (humidity: number): TemperatureStatuses =>
    humidity < 50 ? "baja" : humidity < 92 ? "normal" : "alta";

  const lightLevelState = (lightLevel: LightLevel): LightLevelStatuses =>
    lightLevel === "claro" ? "alta" : "baja";

  const clutterDetectionState = (
    clutterDetection: ClutterDetection
  ): ClutterDetectionStatuses =>
    clutterDetection === "detectado" ? "desordenado" : "ordenado";

  const drawerState = (drawer: DrawerStatuses): DrawerStatuses => drawer;

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
            {loading && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-taupe-dark text-center font-semibold"
                >
                  Cargando ...
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-red-500 text-center">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && sensors && (
              <>
                {/* Temperatura */}
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Temperatura
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    {sensors.temperature} °C
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {temperatureState(sensors.temperature)}
                  </td>
                </tr>

                {/* Humedad */}
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Humedad
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    {sensors.humidity} %
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {humidityState(sensors.humidity)}
                  </td>
                </tr>

                {/* Nivel de Luz */}
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Nivel de Luz
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {sensors.lightLevel}
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {lightLevelState(sensors.lightLevel)}
                  </td>
                </tr>

                {/* Detección de desorden */}
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Detección de desorden
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {sensors.clutterDetection}
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {clutterDetectionState(sensors.clutterDetection)}
                  </td>
                </tr>

                {/* Cajón */}
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark">
                    Cajón
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {sensors.drawer}
                  </td>
                  <td className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize">
                    {drawerState(sensors.drawer)}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </BaseFund>
  );
};

export default Home;
