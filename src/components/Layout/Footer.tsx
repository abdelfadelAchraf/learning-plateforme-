import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <FiBookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                {t('app.title')}
              </span>
            </div>
            <p className="text-gray-400">
              {t('app.subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">
                  {t('navigation.courses')}
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="text-gray-400 hover:text-white transition-colors">
                  {t('navigation.exercises')}
                </Link>
              </li>
              <li>
                <Link to="/exams" className="text-gray-400 hover:text-white transition-colors">
                  {t('navigation.exams')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Matières</h3>
            <ul className="space-y-2">
              {Object.entries(t('subjects', { returnObjects: true })).map(([key, value]) => (
                <li key={key}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-4">
              Des questions ? Contactez-nous à support@learning-platform.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {t('app.title')}. {t('common.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;