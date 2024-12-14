import { Link } from 'react-router-dom';
import { Home, Newspaper,  Bookmark, Settings } from 'lucide-react';

const menuItems = [
    { icon: Home, label: 'Principal', path: '/' },
    { icon: Newspaper, label: 'Últimas Noticias', path: '/latest' },
    { icon: Bookmark, label: 'Guardados', path: '/saved' },
    { icon: Settings, label: 'Configuraciones', path: '/settings' }
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white h-screen shadow-lg fixed left-0 top-16">
        <div className="py-12"> {/* Increased top padding to account for news ticker */}
            <ul className="space-y-2">
            {menuItems.map((item, index) => (
            <li key={index}>
                <Link
                to={item.path}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
                </Link>
            </li>
            ))}
        </ul>
        </div>
        </aside>
    );
}