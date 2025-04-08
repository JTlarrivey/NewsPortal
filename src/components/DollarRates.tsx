import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";

interface DollarRate {
  casa: string;
  nombre: string;
  compra: string;
  venta: string;
  variacion: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function DollarRates() {
  const [rates, setRates] = useState<DollarRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWithRetry = async (retries: number): Promise<DollarRate[]> => {
      try {
        const response = await axios.get("https://dolarapi.com/v1/dolares", {
          timeout: 5000,
        });

        const validCasas = [
          "oficial",
          "blue",
          "bolsa",
          "contadoConLiqui",
          "tarjeta",
        ];

        return response.data
          .filter((item: any) => validCasas.includes(item.casa))
          .map((item: any) => ({
            casa: item.casa,
            nombre: item.nombre,
            compra: item.compra.toFixed(2),
            venta: item.venta.toFixed(2),
            variacion: "0", // Sin datos reales de variación aún
          }));
      } catch (err) {
        if (retries > 0) {
          console.log(`Retrying fetch... (${retries} attempts remaining)`);
          await delay(2000);
          return fetchWithRetry(retries - 1);
        }
        throw err;
      }
    };

    const fetchRates = async () => {
      try {
        const filteredRates = await fetchWithRetry(3);
        setRates(filteredRates);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error fetching dollar rates:", err);
        setError(
          "No se pudieron cargar las cotizaciones. Verifique su conexión e intente más tarde."
        );
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000); // cada 5 min

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-12 bg-black text-green-500">
        <div className="animate-pulse">Cargando cotizaciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-12 bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black text-green-500 py-2 font-mono z-50 border-t border-green-500">
      <div className="max-w-full mx-auto px-4 overflow-hidden">
        <div className="ticker-wrapper whitespace-nowrap hover:pause-animation">
          <div className="dollar-ticker tracking-wider inline-block animate-ticker">
            {rates.map((rate) => (
              <div
                key={rate.nombre}
                className="inline-flex items-center space-x-2 mr-8"
              >
                <DollarSign className="h-4 w-4" />
                <span className="font-bold">{rate.nombre}:</span>
                <span>
                  <span className="mr-2">C: ${rate.compra}</span>
                  <span>V: ${rate.venta}</span>
                </span>
                {rate.variacion !== "0" && (
                  <div
                    className={`flex items-center ${
                      parseFloat(rate.variacion) > 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {parseFloat(rate.variacion) > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{rate.variacion}%</span>
                  </div>
                )}
                <span className="mx-2">★</span>
              </div>
            ))}
          </div>
          {/* Duplicado para animación continua */}
          <div
            className="dollar-ticker tracking-wider inline-block animate-ticker"
            aria-hidden="true"
          >
            {rates.map((rate) => (
              <div
                key={`${rate.nombre}-duplicate`}
                className="inline-flex items-center space-x-2 mr-8"
              >
                <DollarSign className="h-4 w-4" />
                <span className="font-bold">{rate.nombre}:</span>
                <span>
                  <span className="mr-2">C: ${rate.compra}</span>
                  <span>V: ${rate.venta}</span>
                </span>
                {rate.variacion !== "0" && (
                  <div
                    className={`flex items-center ${
                      parseFloat(rate.variacion) > 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {parseFloat(rate.variacion) > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{rate.variacion}%</span>
                  </div>
                )}
                <span className="mx-2">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
