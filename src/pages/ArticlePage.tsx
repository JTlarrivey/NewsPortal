import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Database } from "../lib/supabase";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("No se pudo cargar el artículo");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || "Artículo no encontrado"}
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Category Badge */}
      <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-6">
        {article.category}
      </span>

      {/* Title and Excerpt */}
      <h1 className="text-4xl font-bold text-gray-400 mb-4 leading-tight">
        {article.title}
      </h1>
      <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
        {article.excerpt}
      </h2>

      {/* Article Metadata */}
      <div className="flex items-center space-x-6 mb-8 text-gray-500">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{article.read_time}</span>
        </div>
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>
            {new Date(article.created_at).toLocaleDateString("es-AR")}
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <p className="whitespace-pre-line">{article.content}</p>
      </div>

      {/* Video Section (if provided) */}
      {article.video_url && (
        <div className="mt-8 mb-12">
          <h3 className="text-2xl font-semibold mb-4">Video Relacionado</h3>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <iframe
              src={article.video_url}
              title="Article Video"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </article>
  );
}
