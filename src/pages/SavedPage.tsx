import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

interface SavedArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  savedAt: string;
}

export default function SavedPage() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    // Load saved articles from localStorage
    const loadSavedArticles = () => {
      const articles = JSON.parse(
        localStorage.getItem("savedArticles") || "[]"
      );
      setSavedArticles(articles);
    };

    loadSavedArticles();
    // Add event listener for storage changes
    window.addEventListener("storage", loadSavedArticles);

    return () => {
      window.removeEventListener("storage", loadSavedArticles);
    };
  }, []);

  const sortedArticles = [...savedArticles].sort((a, b) => {
    const comparison =
      new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    return sortOrder === "newest" ? comparison : -comparison;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Artículos Guardados
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Ordenar por:</span>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>
      </div>

      {sortedArticles.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No hay artículos guardados
          </h2>
          <p className="text-gray-500">
            Los artículos que guardes aparecerán aquí para que puedas leerlos
            más tarde.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}
