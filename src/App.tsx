import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import NewsTicker from "./components/NewsTicker";
import AdPopup from "./components/AdPopup";
import AdBanner from "./components/AdBanner";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";

// Example news data
const exampleNews = {
  category: "Technology",
  title:
    "Revolutionary AI Model Breaks New Ground in Natural Language Processing",
  excerpt:
    "A groundbreaking new AI model has demonstrated unprecedented capabilities in understanding and generating human language, marking a significant milestone in the field of artificial intelligence.",
  content: `In a remarkable breakthrough announced today, researchers have unveiled a new artificial intelligence model that pushes the boundaries of natural language processing to new heights. The model, developed through a collaborative effort between leading tech institutions, demonstrates an unprecedented ability to understand context, generate human-like responses, and even grasp subtle nuances in communication.
  
    The development team, led by Dr. Sarah Chen, spent over two years refining the algorithm and training it on a diverse dataset of multilingual content. "What sets this model apart is its ability to understand not just the literal meaning of words, but the broader context and cultural implications," explains Dr. Chen.
  
    Early tests have shown the model achieving accuracy rates of 98.7% in comprehension tasks, significantly outperforming previous benchmarks. The implications of this advancement extend far beyond academic research, with potential applications in education, healthcare, and global communication.
  
    Industry experts are already calling this development a "quantum leap" in AI technology, predicting it could revolutionize how we interact with machines and bridge language barriers across the globe.`,
  author: "Michael Chang",
  date: "March 15, 2024",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <NewsTicker />
        <div className="mt-12">
          <Sidebar />
          <div className="pl-64">
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/news/example"
                  element={<NewsPage {...exampleNews} />}
                />
              </Routes>
            </main>
          </div>
        </div>

        {/* Advertisement Components */}
        <AdPopup
          delay={5000}
          position="center"
          imageUrl="https://images.unsplash.com/photo-1557264322-b44d383a2906?w=500&q=80"
          link="https://example.com/ad1"
        />
        <AdPopup
          delay={20000}
          position="bottom-right"
          imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
          link="https://example.com/ad2"
        />
        <AdBanner
          position="side"
          imageUrl="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80"
          link="https://example.com/ad3"
        />
        <AdBanner
          position="bottom"
          imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80"
          link="https://example.com/ad4"
        />
      </div>
    </Router>
  );
}
