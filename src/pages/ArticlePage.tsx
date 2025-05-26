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
        const { data: articleData, error: articleError } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .single();

        if (articleError) throw articleError;

        // Limpiar llaves en URLs
        if (articleData?.image_url && Array.isArray(articleData.image_url)) {
          articleData.image_url = articleData.image_url.map((url: string) =>
            url.replace(/[{}]/g, "")
          );
        }

        setArticle(articleData);

        // Manejo de métricas
        const handleMetrics = async () => {
          const { data: updatedMetrics, error: updateError } = await supabase
            .from("article_metrics")
            .upsert(
              {
                article_id: id,
                views: 1,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "article_id", ignoreDuplicates: false }
            )
            .select()
            .single();

          if (!updateError && updatedMetrics) {
            setMetrics(updatedMetrics);
            return;
          }

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

  const contentHtml = article.content || "";
  const paragraphs = contentHtml.split(/<\/p>/).filter(Boolean);

  // Crear array limpio de URLs para evitar llaves
  const cleanImageUrls = Array.isArray(article.image_url)
    ? article.image_url.map((url) => url.replace(/[{}]/g, ""))
    : [];

  const interleavedContent = paragraphs.flatMap((paragraph, index) => {
    const contentBlock = [
      <p
        key={`p-${index}`}
        dangerouslySetInnerHTML={{ __html: `${paragraph}</p>` }}
      />,
    ];

    const imageIndex = Math.floor(index / 2) + 1;
    const hasExtraImages = cleanImageUrls.length > imageIndex;

    if (index % 2 === 1 && hasExtraImages) {
      contentBlock.push(
        <div
          key={`img-${imageIndex}`}
          className="my-8 rounded-xl overflow-hidden"
        >
          <img
            src={cleanImageUrls[imageIndex]}
            alt={`Imagen ${imageIndex + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    }

    return contentBlock;
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
        {article.category}
      </span>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {article.title}
      </h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        {article.excerpt}
      </h2>

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

      {/* Imagen principal */}
      {cleanImageUrls[0] && (
        <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
          <img
            src={cleanImageUrls[0]}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Contenido con imágenes intercaladas */}
      <div className="prose prose-lg dark:dark:text-gray-300 prose-invert max-w-none mb-12">
        {interleavedContent}
      </div>

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
