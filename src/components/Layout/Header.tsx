import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiBookOpen, FiHome, FiClipboard, FiBarChart2 } from 'react-icons/fi';
import LanguageSwitcher from '../../common/LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('navigation.home'), icon: <FiHome className="w-5 h-5" /> },
    { path: '/courses', label: t('navigation.courses'), icon: <FiBookOpen className="w-5 h-5" /> },
    { path: '/exercises', label: t('navigation.exercises'), icon: <FiClipboard className="w-5 h-5" /> },
    { path: '/exams', label: t('navigation.exams'), icon: <FiBarChart2 className="w-5 h-5" /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 bg-white py-3 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FiBookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                {t('app.title')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200
                    hover:bg-black/50 hover:text-white 
                    ${
                    location.pathname === item.path
                      ? 'bg-black/70 text-white'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-black/70'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-center mb-4">
                  <LanguageSwitcher />
                </div>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;