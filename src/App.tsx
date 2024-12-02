import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Sidebar from './components/Sidebar';
import NewsTicker from './components/NewsTicker';
import AdPopup from './components/AdPopup';
import AdBanner from './components/AdBanner';
import Home from './pages/Home';

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