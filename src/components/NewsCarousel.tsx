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
            .flatMap((item) => item.articles)
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
      <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-gray-500">No hay artículos destacados</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden rounded-xl">
      {articles.map((article, index) => {
        const flatImages = Array.isArray(article.image_url)
          ? article.image_url.flat()
          : [];

        const cleanImages = flatImages
          .filter((url): url is string => typeof url === "string")
          .map((url) => {
            const trimmed = url.trim();
            return trimmed.replace(/^\{(.*)\}$/, "$1");
          });

        const firstImage = cleanImages[0];

        return (
          <Link
            to={`/news/${article.id}`}
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Gradient Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${firstImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-xl" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end justify-start p-6 sm:p-12 text-white">
              <div className="w-full max-w-5xl lg:max-w-6xl pr-4 sm:pr-8">
                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                  {article.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 leading-tight">
                  {article.title}
                </h2>
                <p className="text-sm sm:text-lg text-gray-200 mb-8">
                  {article.excerpt}
                </p>
                <span className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                  Leer más
                </span>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-20"
      >
        <ChevronLeft className="h-3 w-3 sm:h-3 sm:w-3" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-20"
      >
        <ChevronRight className="h-3 w-3 sm:h-3 sm:w-3" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
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
