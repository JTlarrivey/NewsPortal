import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
    title: string;
    excerpt: string;
    image: string;
    category: string;
}

const articles: Article[] = [
{
    title: "The Future of AI: Breakthroughs and Challenges",
    excerpt: "Recent developments in artificial intelligence are reshaping how we think about technology and its impact on society...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    category: "Technology"
},
{
    title: "Sustainable Cities: Building for Tomorrow",
    excerpt: "Urban planners are revolutionizing city design with green initiatives and smart technology integration...",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    category: "Environment"
},
{
    title: "Global Economy: Markets in Transition",
    excerpt: "Economic experts analyze the shifting dynamics of international trade and digital currencies...",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    category: "Finance"
},
{
    title: "Space Exploration: New Frontiers",
    excerpt: "Latest discoveries from deep space missions are changing our understanding of the universe...",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    category: "Science"
}
];

export default function NewsCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
    };

    const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
    };

    return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        {articles.map((article, index) => (
        <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Background Image with Gradient Overlay */}
            <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
            >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>

          {/* Content */}
            <div className="absolute inset-0 flex items-end justify-start p-12 text-white">
                <div className="max-w-2xl">
                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                {article.category}
                </span>
                <h2 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h2>
                <p className="text-lg text-gray-200 mb-8">{article.excerpt}</p>
                <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Read More
                </button>
                </div>
            </div>
        </div>
        ))}

      {/* Navigation Buttons */}
        <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
        <ChevronLeft className="h-6 w-6" />
        </button>
        <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
        <ChevronRight className="h-6 w-6" />
        </button>

      {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            />
            ))}
        </div>
        </div>
    );
}