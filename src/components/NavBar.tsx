import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search,
  Bell,
  User,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import AuthForms from "./AuthForms";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authFormType, setAuthFormType] = useState<"login" | "register">(
    "login"
  );
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    document.documentElement.classList.toggle("dark", newMode);
    localStorage.theme = newMode ? "dark" : "light";
  };

  const handleAuthClick = (type: "login" | "register") => {
    setAuthFormType(type);
    setShowAuthForm(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                aria-label="Abrir menú"
                className="md:hidden"
              >
                <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
              </button>
              <Link
                to="/"
                className="ml-4 text-xl font-bold text-gray-900 dark:text-white"
              >
                Prisma
              </Link>
            </div>

            <div className="flex items-center">
              <div className="relative mx-4 hidden sm:block">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  className="w-64 px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center space-x-4">
                <Bell
                  className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  aria-label="Notificaciones"
                />

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Cambiar tema"
                  title="Cambiar tema"
                >
                  {isDark ? (
                    <Sun className="h-6 w-6 text-gray-300 hover:text-white" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                  )}
                </button>

                <Menu as="div" className="relative">
                  <Menu.Button
                    className="flex items-center"
                    aria-label="Menú de usuario"
                  >
                    <User className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleAuthClick("login")}
                              className={`${
                                active
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900 dark:text-gray-300"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <LogIn className="mr-2 h-5 w-5" />
                              Iniciar Sesión
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleAuthClick("register")}
                              className={`${
                                active
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900 dark:text-gray-300"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <UserPlus className="mr-2 h-5 w-5" />
                              Registrarse
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleAuthClick("login")}
                              className={`${
                                active
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900 dark:text-gray-300"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <svg
                                className="mr-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="20"
                                height="20"
                              >
                                <path
                                  fill="#4285F4"
                                  d="M24 9.5c3.54 0 6.3 1.47 8.22 2.71l6.11-5.88C34.39 3.02 29.67 1 24 1 14.79 1 6.94 6.98 3.66 15.09l7.46 5.8C12.66 14.56 17.82 9.5 24 9.5z"
                                />
                                <path
                                  fill="#34A853"
                                  d="M46.65 24.52c0-1.55-.13-2.69-.41-3.87H24v7.34h12.9c-.26 2.15-1.7 5.38-4.88 7.55l7.44 5.78c4.36-4.03 6.89-9.95 6.89-16.8z"
                                />
                              </svg>
                              Continuar con Google
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthForms
        isOpen={showAuthForm}
        onClose={() => setShowAuthForm(false)}
        formType={authFormType}
      />
    </>
  );
}
