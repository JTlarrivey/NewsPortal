import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import NewsTicker from "./components/NewsTicker";
import AdPopup from "./components/AdPopup";
import AdBanner from "./components/AdBanner";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import WeatherPage from "./pages/WeatherPage";
import SavedPage from "./pages/SavedPage";
import ArticlePage from "./pages/ArticlePage";

// Example news data
const exampleNews = {
  category: "Política",
  title:
    "Resumen completo de la Gala de asunción de Donald Trump como presidente de los Estados Unidos",
  excerpt:
    "Una jornada llena de expectativa y polémica en la que no faltaron representantes de ningún rincón del mundo.",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunce,
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor
  ultricies nunc nec, ultricies nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunc. 
  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sed nec ante auctor, ultricies nunc nec, ultricies nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante auctor, ultricies nunc nec, ultricies nunc.`,
  author: "Matias Russo",
  date: "4 de Febrero, 2025",
  image: "https://www.clarin.com/img/2025/01/17/P-1gJ2FPO_720x0__1.jpg",
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
                <Route path="/news" element={<NewsPage />} />
                <Route
                  path="/news/:id"
                  element={<ArticlePage {...exampleNews} />}
                />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/saved" element={<SavedPage />} />
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
