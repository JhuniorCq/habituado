import { useEffect, useState } from "react";
import BaseFund from "../components/BaseFund";
import type { Alert } from "../utils/types";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../libs/firebase";

const AlertHistory = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "alerts"));
        const alertData: Alert[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Alert;
          alertData.push(data);
        });

        setAlerts(alertData);
      } catch (error) {
        console.error("Error al traer alertas: ", error);
        setError("Ocurrió un problema al obtener las alertas");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <BaseFund
      title="HISTORIAL DE ALERTAS"
      buttonName="DATOS EN TIEMPO REAL"
      redictTo="/"
    >
      <div className="w-64 max-h-96 overflow-auto pb-4 min-[480px]:w-80 sm:w-[420px] md:w-[620px] lg:w-[820px] xl:w-[1020px] 2xl:w-[1260px] min-[1640px]:w-[1460px] min-[1860px]:w-[1670px] min-[1860px]:pb-0">
        <table className="w-full table-auto border-collapse border border-taupe-dark text-sm min-[480px]:text-base">
          <thead>
            <tr className="bg-white">
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Fecha
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Hora
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Alerta
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Temperatura
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Humedad
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Nivel de Luz
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Detección de desorden
              </th>
              <th className="min-w-32 border border-taupe-dark text-center px-3 py-2 text-taupe-dark sm:min-w-40 xl:min-w-52">
                Cajón
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
                  Cargando alertas ...
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

            {!loading && !error && alerts.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-red-500 text-center">
                  No hay alertas registradas aún.
                </td>
              </tr>
            )}

            {/* Filas dinámicas */}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
            {!loading &&
              !error &&
              alerts.length > 0 &&
              alerts.map((a, i) => (
                <tr className="bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  {/* Fecha */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.date}
                  </td>
                  {/* Hora */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.time}
                  </td>
                  {/* Alerta */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.alert}
                  </td>
                  {/* Temperatura */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.temperature}
                  </td>
                  {/* Humedad */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark"
                  >
                    {a.humidity}
                  </td>
                  {/* Nivel de Luz */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.lightLevel}
                  </td>
                  {/* Detección de desorden */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.clutterDetection}
                  </td>
                  {/* Cajón */}
                  <td
                    key={i}
                    className="border border-taupe-dark text-center px-3 py-1 text-taupe-dark capitalize"
                  >
                    {a.drawer}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BaseFund>
  );
};

export default AlertHistory;
