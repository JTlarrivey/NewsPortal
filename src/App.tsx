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
import { useEffect, useState } from "react";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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

  // Prevención de scroll horizontal global
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-x-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <NewsTicker />

        <div className="mt-12 flex">
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
          <div className="flex-1 px-4 sm:px-6 md:px-8 transition-all duration-300">
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

        <AdBanner position="side" />
        <AdBanner position="bottom" />
        <AdPopup />

        <DollarRates />
      </div>
    </Router>
  );
}
