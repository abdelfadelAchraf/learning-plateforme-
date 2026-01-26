import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('preferredLanguage', language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Changer la langue"
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiGlobe className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="font-medium text-gray-700 hidden sm:inline">
            {currentLanguage.label}
          </span>
        </div>
        <FiChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <>
          {/* Overlay pour fermer en cliquant à l'extérieur */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-56 z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">Sélectionner la langue</p>
                <p className="text-xs text-gray-500 mt-1">Choisissez votre langue préférée</p>
              </div>
              
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-150 group ${
                      i18n.language === lang.code ? 'bg-primary-50' : ''
                    }`}
                    aria-label={`Changer en ${lang.nativeName}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{lang.flag}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 group-hover:text-primary-600">
                          {lang.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {lang.nativeName}
                        </div>
                      </div>
                    </div>
                    
                    {i18n.language === lang.code && (
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                          <FiCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
             
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;