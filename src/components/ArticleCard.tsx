import { Clock, MessageSquare, Share2 } from 'lucide-react';

interface ArticleProps {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    readTime: string;
    comments: number;
}

export default function ArticleCard({ title, excerpt, image, category, readTime, comments }: ArticleProps) {
    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
        <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">{readTime}</span>
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="mr-4">{comments}</span>
            <Share2 className="h-4 w-4 cursor-pointer hover:text-blue-600" />
            </div>
        </div>
    </article>
    );
}