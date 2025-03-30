import { useState, useEffect } from "react";
import NewsCarousel from "../components/NewsCarousel";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../lib/api";
import type { Database } from "../lib/supabase";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
          {articles.slice(0, 6).map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image_url}
              category={article.category}
              readTime={article.read_time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
