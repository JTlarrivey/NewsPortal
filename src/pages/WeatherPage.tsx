import { useState, useEffect } from "react";
import axios from "axios";
import {
  Cloud,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  CloudRain,
  Search,
  MapPin,
  Calendar,
} from "lucide-react";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: ForecastDay[];
}

interface ForecastDay {
  date: string;
  temp: number;
  icon: string;
  description: string;
}

interface City {
  name: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
  { name: "Córdoba", lat: -31.4201, lon: -64.1888 },
  { name: "Rosario", lat: -32.9468, lon: -60.6393 },
  { name: "Mendoza", lat: -32.8908, lon: -68.8272 },
  { name: "Mar del Plata", lat: -38.0023, lon: -57.5575 },
  { name: "San Carlos de Bariloche", lat: -41.1335, lon: -71.3109 },
  { name: "Salta", lat: -24.7859, lon: -65.4117 },
  { name: "Ushuaia", lat: -54.8019, lon: -68.303 },
  { name: "La Plata", lat: -34.9215, lon: -57.9545 },
];

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const weatherPromises = cities.map(async (city) => {
          try {
            // Current weather
            const currentWeather = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=es`
            );

            // 5-day forecast
            const forecast = await axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=es`
            );

            const forecastDays = forecast.data.list
              .filter((_: any, index: number) => index % 8 === 0)
              .slice(0, 5)
              .map((day: any) => ({
                date: new Date(day.dt * 1000).toLocaleDateString("es-AR", {
                  weekday: "short",
                }),
                temp: Math.round(day.main.temp),
                icon: day.weather[0].icon,
                description: day.weather[0].description,
              }));

            return {
              city: city.name,
              temperature: Math.round(currentWeather.data.main.temp),
              description: currentWeather.data.weather[0].description,
              humidity: currentWeather.data.main.humidity,
              windSpeed: Math.round(currentWeather.data.wind.speed * 3.6),
              icon: currentWeather.data.weather[0].icon,
              forecast: forecastDays,
            };
          } catch (err) {
            console.error(`Error fetching data for ${city.name}:`, err);
            return null;
          }
        });

        const responses = (await Promise.all(weatherPromises)).filter(
          (data): data is WeatherData => data !== null
        );
        setWeatherData(responses);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(
          "Error al cargar los datos del clima. Por favor, intente nuevamente más tarde."
        );
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode.slice(0, 2)) {
      case "01":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "09":
      case "10":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const filteredCities = weatherData.filter((city) =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCityData = selectedCity
    ? weatherData.find((city) => city.city === selectedCity)
    : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Clima en Argentina
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Weather Map Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <MapPin className="h-5 w-5 mr-2" />
          {showMap ? "Ocultar Mapa" : "Ver Mapa del Clima"}
        </button>
      </div>

      {/* Weather Map */}
      {showMap && (
        <div className="mb-8 bg-white rounded-xl shadow-lg p-4">
          <iframe
            src="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=-38.416&lon=-63.616&zoom=4"
            className="w-full h-[500px] rounded-lg"
            title="Mapa del clima"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      {/* City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <div
            key={city.city}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedCity(city.city)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {city.city}
                </h2>
                <p className="text-gray-600 capitalize">{city.description}</p>
              </div>
              {getWeatherIcon(city.icon)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-2xl font-bold">{city.temperature}°C</span>
              </div>

              <div className="flex items-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                <span>Humedad: {city.humidity}%</span>
              </div>

              <div className="flex items-center">
                <Wind className="h-5 w-5 text-gray-500 mr-2" />
                <span>Viento: {city.windSpeed} km/h</span>
              </div>
            </div>

            {/* 5-day Forecast Preview */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                {city.forecast.slice(0, 3).map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-600">{day.date}</p>
                    <p className="font-semibold">{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed City View Modal */}
      {selectedCityData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedCityData.city}</h2>
              <button
                onClick={() => setSelectedCity(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Current Weather */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {getWeatherIcon(selectedCityData.icon)}
                <div className="ml-4">
                  <p className="text-4xl font-bold">
                    {selectedCityData.temperature}°C
                  </p>
                  <p className="text-gray-600 capitalize">
                    {selectedCityData.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Humedad: {selectedCityData.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Viento: {selectedCityData.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            {/* 5-day Forecast */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Pronóstico de 5 días
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {selectedCityData.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="font-medium">{day.date}</p>
                    {getWeatherIcon(day.icon)}
                    <p className="font-bold">{day.temp}°C</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
