import { Link } from "react-router-dom";
import { Home, Newspaper, Bookmark, Cloud, X } from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { icon: Home, label: "Principal", path: "/" },
  { icon: Newspaper, label: "Noticias", path: "/news" },
  { icon: Bookmark, label: "Guardados", path: "/saved" },
  { icon: Cloud, label: "Clima", path: "/weather" },
];

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  return (
    <>
      {/* Overlay en mobile */}
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative lg:top-0 lg:z-10"
        )}
      >
        {/* Botón de cerrar en mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={closeSidebar}
            className="text-gray-700 dark:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de navegación */}
        <nav className="pt-6 lg:pt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={closeSidebar}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
