import React from 'react';
import { FiSearch, FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                placeholder="Rechercher des cours, exercices..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 ml-6">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
              <FiSettings className="w-5 h-5" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Déconnexion"
            >
              <FiLogOut className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-primary-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;