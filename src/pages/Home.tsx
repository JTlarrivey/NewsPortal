import NewsCarousel from "../components/NewsCarousel";
import ArticleCard from "../components/ArticleCard";

// Featured articles data
const featuredArticles = [
  {
    id: 1,
    title: "La Big Mac más cara de Latinoamérica es argentina",
    excerpt:
      "Según el índice Big Mac, la hamburguesa de McDonald's cuesta 7,4 dólares en Argentina, convirtiéndiose en la más cara de la región...",
    image:
      "http://img.20mn.fr/o9yyTMGORKOwTFvIGJ2GhQ/2048x1536-fit_big-mac-lance-1967.jpg",
    category: "Economía",
    readTime: "5 min",
  },
  {
    id: 2,
    title:
      "Las fuertes declaraciones de Juan Sebastián Verón sobre el presente y futuro de Estudiantes",
    excerpt:
      "El presidente del Pincha habló de todo el proyecto junto al inversor Foster Gillett, el pase de Medina, el gran objetivo y las críticas...",
    image: "https://infocielo.com/wp-content/uploads/2024/12/veronjpg-14.jpg",
    category: "Deportes",
    readTime: "8 min",
  },
  {
    id: 3,
    title:
      "Según el FMI, entre 2025 y 2026 la economía argentina será la cuarta de mayor crecimiento del mundo",
    excerpt:
      "De todos modos, recién a fin del año próximo el PBI superaría con nitidez el nivel de 2022...",
    image:
      "https://d3b5jqy5xuub7g.cloudfront.net/wp-content/uploads/2025/01/milei.jpg",
    category: "Economía",
    readTime: "10 min",
  },
  {
    id: 4,
    title:
      "Asunción de Trump: un intendente argentino fue invitado a la ceremonia de gala",
    excerpt:
      "El intendente de Añelo, Fernando Banderet, viajó acompañado de dos representantes de cámaras empresariales...",
    image:
      "https://www.rionegro.com.ar/wp-content/uploads/2025/01/fernando-banderet-texas.jpg",
    category: "Política",
    readTime: "6 min",
  },
  {
    id: 5,
    title: "Nueva tecnología revoluciona la industria automotriz argentina",
    excerpt:
      "Empresas locales desarrollan innovadores sistemas de propulsión eléctrica que prometen transformar el sector...",
    image:
      "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&q=80",
    category: "Tecnología",
    readTime: "7 min",
  },
  {
    id: 6,
    title: "Descubren nuevas especies en la Patagonia argentina",
    excerpt:
      "Científicos identifican tres nuevas especies de flora endémica en la región sur del país...",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Ciencia",
    readTime: "4 min",
  },
];

export default function Home() {
  return (
    <div>
      <div className="-mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <NewsCarousel />
      </div>

      {/* Featured Articles Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Noticias Destacadas
          </h2>
          <p className="mt-2 text-gray-600">
            Las noticias más relevantes de hoy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
