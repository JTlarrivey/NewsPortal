import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search,
  Bell,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AuthForms from "./AuthForms";

export default function Navbar() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authFormType, setAuthFormType] = useState<"login" | "register">(
    "login"
  );

  const handleAuthClick = (type: "login" | "register") => {
    setAuthFormType(type);
    setShowAuthForm(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MenuIcon className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
              <Link to="/" className="ml-4 text-xl font-bold text-gray-900">
                Prisma
              </Link>
            </div>

            <div className="flex items-center">
              <div className="relative mx-4">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  className="w-64 px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />

                {/* Auth Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center">
                    <User className="h-6 w-6 text-gray-600 hover:text-gray-900" />
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleAuthClick("login")}
                              className={`${
                                active
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900"
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
                                  : "text-gray-900"
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
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  fill={active ? "#fff" : "#4285F4"}
                                />
                                <path
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  fill={active ? "#fff" : "#34A853"}
                                />
                                <path
                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  fill={active ? "#fff" : "#FBBC05"}
                                />
                                <path
                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  fill={active ? "#fff" : "#EA4335"}
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
