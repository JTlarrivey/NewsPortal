import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabase";
import ArticleCard from "../components/ArticleCard";

interface SavedArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  savedAt: string;
}

export default function SavedPage() {
  const { user } = useUser();
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    if (!user) {
      console.log("No user logged in");
      return;
    }

    console.log("User logged in:", user);
    console.log("User ID:", user.id);

    const fetchSavedArticles = async () => {
      const { data, error } = await supabase
        .from("saved_articles")
        .select(
          `
          created_at,
          article_id (
            id,
            title,
            excerpt,
            image_url,
            category,
            read_time,
            author_name
          )
        `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching saved articles:", error);
        return;
      }

      console.log("Data fetched from Supabase:", data);

      const articles = data
        .filter((item: any) => item.article_id !== null)
        .map((item: any) => ({
          ...item.article_id,
          image: item.article_id.image_url, // Renombramos aquí
          readTime: item.article_id.read_time,
          savedAt: item.created_at,
        }));

      console.log("Mapped articles:", articles);

      setSavedArticles(articles);
    };

    fetchSavedArticles();
  }, [user]);

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
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
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
            <ArticleCard
              key={article.id}
              {...article}
              id={article.id.toString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
