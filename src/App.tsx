import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import NewsTicker from "./components/NewsTicker";
import AdPopup from "./components/AdPopup";
import AdBanner from "./components/AdBanner";
import DollarRates from "./components/DollarRates";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import WeatherPage from "./pages/WeatherPage";
import SavedPage from "./pages/SavedPage";
import ArticlePage from "./pages/ArticlePage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Check for saved theme preference or default to light
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <NewsTicker />
        <div className="mt-12">
          <Sidebar />
          <div className="pl-64">
            <main className="pb-16">
              {" "}
              {/* Added padding to prevent content from being hidden by the footer */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<ArticlePage />} />
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

        {/* Dollar Rates Footer */}
        <DollarRates />
      </div>
    </Router>
  );
}
