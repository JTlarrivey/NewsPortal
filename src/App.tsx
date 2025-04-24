import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import NewsTicker from "./components/NewsTicker";
import AdBanner from "./components/AdBanner";
import AdPopup from "./components/AdPopup";
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
        <AdBanner position="side" />
        <AdBanner position="bottom" />
        <AdPopup />

        {/* Dollar Rates Footer */}
        <DollarRates />
      </div>
    </Router>
  );
}
