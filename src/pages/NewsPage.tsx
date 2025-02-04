import { useState } from "react";
import ArticleCard from "../components/ArticleCard";

// Example news data - In a real app, this would come from an API
const newsData = [
  {
    id: 1,
    title: "La Big Mac más cara de Latinoamérica es argentina",
    excerpt:
      "Según el índice Big Mac, la hamburguesa de McDonald's cuesta 7,4 dólares en Argentina, convirtiéndiose en la más cara de la región...",
    image:
      "http://img.20mn.fr/o9yyTMGORKOwTFvIGJ2GhQ/2048x1536-fit_big-mac-lance-1967.jpg",
    category: "Economía",
    date: "2024-03-15T10:30:00Z",
    readTime: "5 min",
    comments: 12,
  },
  {
    id: 2,
    title:
      "Las fuertes declaraciones de Juan Sebastián Verón sobre el presente y futuro de Estudiantes",
    excerpt:
      "El presidente del Pincha habló de todo el proyecto junto al inversor Foster Gillett, el pase de Medina, el gran objetivo y las críticas...",
    image: "https://infocielo.com/wp-content/uploads/2024/12/veronjpg-14.jpg",
    category: "Deportes",
    date: "2024-03-15T09:15:00Z",
    readTime: "8 min",
    comments: 45,
  },
  {
    id: 3,
    title:
      "Según el FMI, entre 2025 y 2026 la economía argentina será la cuarta de mayor crecimiento del mundo",
    excerpt:
      "De todos modos, recién a fin del año próximo el PBI superaría con nitidez el nivel de 2022...",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    category: "Economía",
    date: "2024-03-14T16:45:00Z",
    readTime: "10 min",
    comments: 89,
  },
  {
    id: 4,
    title:
      "Asunción de Trump: un intendente argentino fue invitado a la ceremonia de gala",
    excerpt:
      "El intendente de Añelo, Fernando Banderet, viajó acompañado de dos representantes de cámaras empresariales...",
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
    category: "Política",
    date: "2024-03-14T14:20:00Z",
    readTime: "6 min",
    comments: 34,
  },
  {
    id: 5,
    title: "Nueva tecnología revoluciona la industria automotriz argentina",
    excerpt:
      "Empresas locales desarrollan innovadores sistemas de propulsión eléctrica...",
    image:
      "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&q=80",
    category: "Tecnología",
    date: "2024-03-14T11:00:00Z",
    readTime: "7 min",
    comments: 23,
  },
  {
    id: 6,
    title: "Descubren nuevas especies en la Patagonia argentina",
    excerpt:
      "Científicos identifican tres nuevas especies de flora endémica en la región...",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Ciencia",
    date: "2024-03-14T09:30:00Z",
    readTime: "4 min",
    comments: 15,
  },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const categories = [
    "todas",
    ...new Set(newsData.map((article) => article.category)),
  ];

  // Sort news by date (most recent first)
  const sortedNews = [...newsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter by category if one is selected
  const filteredNews =
    selectedCategory === "todas"
      ? sortedNews
      : sortedNews.filter((article) => article.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Noticias</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            excerpt={article.excerpt}
            image={article.image}
            category={article.category}
            readTime={article.readTime}
          />
        ))}
      </div>
    </div>
  );
}
