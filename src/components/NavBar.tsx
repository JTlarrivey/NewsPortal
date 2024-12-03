import { Link } from 'react-router-dom';
import { Menu, Search, Bell, User } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
                <Menu className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                <Link to="/" className="ml-4 text-xl font-bold text-gray-900">
                Prisma
                </Link>
            </div>

            <div className="flex items-center">
                <div className="relative mx-4">
                    <input
                    type="text"
                    placeholder="Search news..."
                    className="w-64 px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                <User className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            </div>
            </div>
            </div>
        </div>
        </nav>
    );
}