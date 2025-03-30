import { Clock, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

interface ArticleProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  image,
  category,
  readTime,
}: ArticleProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("saved_articles")
        .select("id")
        .eq("article_id", id)
        .eq("user_id", user.id)
        .maybeSingle();

      setIsSaved(!!data);
    };

    checkIfSaved();
  }, [id, user]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (isSaved) {
        await supabase
          .from("saved_articles")
          .delete()
          .eq("article_id", id)
          .eq("user_id", user.id);
        setIsSaved(false);
      } else {
        await supabase.from("saved_articles").insert([
          {
            article_id: id,
            user_id: user.id,
          },
        ]);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.share({
        title,
        text: excerpt,
        url: window.location.origin + `/news/${id}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            {category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">{readTime}</span>
            {user && (
              <button
                onClick={handleSave}
                className="mr-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Bookmark
                  className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                />
              </button>
            )}
            <button onClick={handleShare}>
              <Share2 className="h-4 w-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" />
            </button>
          </div>
          <Link
            to={`/news/${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Leer más
          </Link>
        </div>
      </div>
    </article>
  );
}
