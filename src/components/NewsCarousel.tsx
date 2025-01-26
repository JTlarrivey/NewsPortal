import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "La Big Mac más cara de Latinoamérica es argentina",
    excerpt:
      "Según el índice Big Mac, la hamburguesa de McDonald's cuesta 7,4 dólares en Argentina, convirtiéndiose en la más cara de la región...",
    image:
      "http://img.20mn.fr/o9yyTMGORKOwTFvIGJ2GhQ/2048x1536-fit_big-mac-lance-1967.jpg",
    category: "Economía",
  },
  {
    id: 2,
    title:
      "Las fuertes declaraciones de Juan Sebastián Verón sobre el presente y futuro de Estudiantes",
    excerpt:
      "El presidente del Pincha habló de todo el proyecto junto al inversor Foster Gillett, el pase de Medina, el gran objetivo y las críticas...",
    image: "https://cdn.clarosports.com/clarosports/2024/07/veron-210652.jpg",
    category: "Política",
  },
  {
    id: 3,
    title:
      "Según el FMI, entre 2025 y 2026 la economía argentina será la cuarta de mayor crecimiento del mundo",
    excerpt:
      "De todos modos, recién a fin del año próximo el PBI superaría con nitidez el nivel de 2022. Qué arroja la comparación de los últimos 30 años entre las tres mayores economías latinoamericanas y EEUU, qué lados tiene el “triángulo del crecimiento sustentable” y por qué la Argentina fue “el peor de la clase”...",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.LrdxopUIE0nLZLqilQNr4gHaEm&pid=Api&P=0&h=180",
    category: "Economía",
  },
  {
    id: 4,
    title:
      "Asunción de Trump: un intendente argentino fue invitado a la ceremonia de gala",
    excerpt:
      "El intendente de Añelo, Fernando Banderet, viajó acompañado de dos representantes de cámaras empresariales, Ignacio Iranzi y Raúl Martin...",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.5EZCuWipNh14fQNFs3L7xgHaEK&pid=Api&P=0&h=180",
    category: "Política",
  },
];

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-end justify-start p-12 text-white">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                {article.category}
              </span>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                {article.title}
              </h2>
              <p className="text-lg text-gray-200 mb-8">{article.excerpt}</p>
              <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Leer más
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
