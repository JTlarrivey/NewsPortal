import { Link } from "react-router-dom";
import { Home, Newspaper, Bookmark, Settings, Cloud } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Principal", path: "/" },
  { icon: Newspaper, label: "Noticias", path: "/news" },
  { icon: Bookmark, label: "Guardados", path: "/saved" },
  { icon: Cloud, label: "Clima", path: "/weather" },
  { icon: Settings, label: "Configuraciones", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen shadow-lg fixed left-0 top-16 transition-colors duration-200">
      <div className="py-12">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
