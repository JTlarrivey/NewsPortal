import { Clock, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface ArticleProps {
  id: number;
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

  useEffect(() => {
    // Check if article is saved on component mount
    const savedArticles = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );
    setIsSaved(savedArticles.some((article: any) => article.id === id));
  }, [id]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the save button
    const savedArticles = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );

    if (isSaved) {
      // Remove from saved articles
      const updatedSavedArticles = savedArticles.filter(
        (article: any) => article.id !== id
      );
      localStorage.setItem(
        "savedArticles",
        JSON.stringify(updatedSavedArticles)
      );
      setIsSaved(false);
    } else {
      // Add to saved articles
      const articleToSave = {
        id,
        title,
        excerpt,
        image,
        category,
        readTime,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "savedArticles",
        JSON.stringify([...savedArticles, articleToSave])
      );
      setIsSaved(true);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
            {category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
          {title}
        </h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">{readTime}</span>
            <button
              onClick={handleSave}
              className="mr-4 hover:text-blue-600 transition-colors"
            >
              <Bookmark
                className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
              />
            </button>
            <Share2 className="h-4 w-4 cursor-pointer hover:text-blue-600" />
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
