import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, User, Eye } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Database } from "../lib/supabase";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleMetrics = Database["public"]["Tables"]["article_metrics"]["Row"];

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [metrics, setMetrics] = useState<ArticleMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        // Fetch article data
        const { data: articleData, error: articleError } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .single();

        if (articleError) throw articleError;
        setArticle(articleData);

        // Handle metrics with upsert pattern
        const handleMetrics = async () => {
          // First try to update existing metrics
          const { data: updatedMetrics, error: updateError } = await supabase
            .from("article_metrics")
            .upsert(
              {
                article_id: id,
                views: 1,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "article_id",
                ignoreDuplicates: false,
              }
            )
            .select()
            .single();

          if (!updateError && updatedMetrics) {
            setMetrics(updatedMetrics);
            return;
          }

          // If the upsert failed, try to get current metrics and increment
          const { data: currentMetrics } = await supabase
            .from("article_metrics")
            .select("*")
            .eq("article_id", id)
            .single();

          if (currentMetrics) {
            const { data: incrementedMetrics, error: incrementError } =
              await supabase
                .from("article_metrics")
                .update({
                  views: currentMetrics.views + 1,
                  updated_at: new Date().toISOString(),
                })
                .eq("article_id", id)
                .select()
                .single();

            if (!incrementError && incrementedMetrics) {
              setMetrics(incrementedMetrics);
            }
          }
        };

        await handleMetrics();
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("No se pudo cargar el artículo");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
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
      <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
        {article.category}
      </span>

      {/* Title and Excerpt */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {article.title}
      </h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        {article.excerpt}
      </h2>

      {/* Article Metadata */}
      <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{article.read_time}</span>
        </div>
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>{article.author_name || "Anónimo"}</span>
        </div>
        <div className="flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          <span>{metrics?.views || 0} vistas</span>
        </div>
        <div className="flex items-center">
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
      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content || "" }}
      />

      {/* Video Section (if provided) */}
      {article.video_url && (
        <div className="mt-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Video Relacionado
          </h3>
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
