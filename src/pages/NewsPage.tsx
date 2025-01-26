import { Clock, User } from 'lucide-react';

interface NewsPageProps {
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  videoUrl?: string;
}

export default function NewsPage({
  category,
  title,
  excerpt,
  content,
  author,
  date,
  image,
  videoUrl
}: NewsPageProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Category Badge */}
      <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-6">
        {category}
      </span>

      {/* Title and Excerpt */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {title}
      </h1>
      <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
        {excerpt}
      </h2>

      {/* Article Metadata */}
      <div className="flex items-center space-x-6 mb-8 text-gray-500">
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>{author}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{date}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <p className="whitespace-pre-line">
          {content}
        </p>
      </div>

      {/* Video Section (if provided) */}
      {videoUrl && (
        <div className="mt-8 mb-12">
          <h3 className="text-2xl font-semibold mb-4">Related Video</h3>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <iframe
              src={videoUrl}
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