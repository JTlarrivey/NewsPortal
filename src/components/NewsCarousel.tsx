import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import type { Database } from "../lib/supabase";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselArticles = async () => {
      try {
        const { data: carouselItems } = await supabase
          .from("carousel_items")
          .select(
            `
            article_id,
            order,
            articles (
              id,
              title,
              excerpt,
              image_url,
              category
            )
          `
          )
          .eq("active", true)
          .order("order");

        if (carouselItems) {
          const articlesData = carouselItems
            .flatMap((item) => item.articles) // Aplana la estructura
            .filter((article): article is Article => article !== null);

          setArticles(articlesData);
        }
      } catch (error) {
        console.error("Error fetching carousel articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselArticles();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (loading) {
    return (
      <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No hay artículos destacados</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image_url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-end justify-start p-12 text-white">
            <div className="w-full max-w-5xl lg:max-w-6xl pr-8">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                {article.category}
              </span>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                {article.title}
              </h2>
              <p className="text-lg text-gray-200 mb-8">{article.excerpt}</p>
              <Link
                to={`/news/${article.id}`}
                className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Leer más
              </Link>
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
