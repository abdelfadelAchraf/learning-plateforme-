import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiBook, 
  FiClipboard, 
  FiAward, 
  FiChevronRight,
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiCpu
} from 'react-icons/fi';
import { 
  TbMath,
  TbAtom,
  TbHistory,
  TbLanguage
} from 'react-icons/tb';
import { 
  GiBrain,
  GiChemicalDrop,
  GiWorld
} from 'react-icons/gi';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('home.features.courses.title'),
      description: t('home.features.courses.description'),
      icon: <FiBook className="w-7 h-7" />,
      linear: 'from-blue-500 via-blue-600 to-blue-700',
      hoverlinear: 'from-blue-600 via-blue-700 to-blue-800',
      color: 'text-blue-600',
      path: '/courses',
      accent: <FiTrendingUp className="w-5 h-5 absolute right-4 top-4 opacity-50" />
    },
    {
      title: t('home.features.exercises.title'),
      description: t('home.features.exercises.description'),
      icon: <FiClipboard className="w-7 h-7" />,
      linear: 'from-emerald-500 via-emerald-600 to-emerald-700',
      hoverlinear: 'from-emerald-600 via-emerald-700 to-emerald-800',
      color: 'text-emerald-600',
      path: '/exercises',
      accent: <FiZap className="w-5 h-5 absolute right-4 top-4 opacity-50" />
    },
    {
      title: t('home.features.exams.title'),
      description: t('home.features.exams.description'),
      icon: <FiAward className="w-7 h-7" />,
      linear: 'from-violet-500 via-violet-600 to-violet-700',
      hoverlinear: 'from-violet-600 via-violet-700 to-violet-800',
      color: 'text-violet-600',
      path: '/exams',
      accent: <FiTarget className="w-5 h-5 absolute right-4 top-4 opacity-50" />
    }
  ];

  const subjects = [
    { 
      key: 'mathematics', 
      name: t('subjects.mathematics'),
      icon: <TbMath className="w-8 h-8" />,
      linear: 'from-red-500 to-orange-500',
      bg: 'bg-linear-to-br from-red-50 to-orange-50',
      hover: 'hover:shadow-red-200'
    },
    { 
      key: 'physics', 
      name: t('subjects.physics'),
      icon: <TbAtom className="w-8 h-8" />,
      linear: 'from-blue-500 to-cyan-500',
      bg: 'bg-linear-to-br from-blue-50 to-cyan-50',
      hover: 'hover:shadow-blue-200'
    },
    { 
      key: 'chemistry', 
      name: t('subjects.chemistry'),
      icon: <GiChemicalDrop className="w-8 h-8" />,
      linear: 'from-green-500 to-emerald-500',
      bg: 'bg-linear-to-br from-green-50 to-emerald-50',
      hover: 'hover:shadow-green-200'
    },
    { 
      key: 'biology', 
      name: t('subjects.biology'),
      icon: <GiBrain className="w-8 h-8" />,
      linear: 'from-emerald-500 to-teal-500',
      bg: 'bg-linear-to-br from-emerald-50 to-teal-50',
      hover: 'hover:shadow-emerald-200'
    },
    { 
      key: 'computerScience', 
      name: t('subjects.computerScience'),
      icon: <FiCpu className="w-8 h-8" />,
      linear: 'from-indigo-500 to-purple-500',
      bg: 'bg-linear-to-br from-indigo-50 to-purple-50',
      hover: 'hover:shadow-indigo-200'
    },
    { 
      key: 'history', 
      name: t('subjects.history'),
      icon: <TbHistory className="w-8 h-8" />,
      linear: 'from-amber-500 to-yellow-500',
      bg: 'bg-linear-to-br from-amber-50 to-yellow-50',
      hover: 'hover:shadow-amber-200'
    },
    { 
      key: 'geography', 
      name: t('subjects.geography'),
      icon: <GiWorld className="w-8 h-8" />,
      linear: 'from-cyan-500 to-sky-500',
      bg: 'bg-linear-to-br from-cyan-50 to-sky-50',
      hover: 'hover:shadow-cyan-200'
    },
    { 
      key: 'languages', 
      name: t('subjects.languages'),
      icon: <TbLanguage className="w-8 h-8" />,
      linear: 'from-pink-500 to-rose-500',
      bg: 'bg-linear-to-br from-pink-50 to-rose-50',
      hover: 'hover:shadow-pink-200'
    },
  ];

  

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Hero Section avec effet de particules */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-50 via-white to-primary-50">
        {/* Effets de fond animés */}
      

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
               
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="block">Maîtrisez</span>
                  <span className="block text-green-500 bg-clip-text bg-linear-to-r from-primary-600 via-primary-700 to-primary-800 animate-linear-x">
                    Vos Connaissances
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  {t('home.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-linear-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary-500 to-primary-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <span className="relative">{t('home.startLearning')}</span>
                  <FiArrowRight className="ml-3 w-5 h-5 relative group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                
              </div>
              
          
            </div>
            
            {/* Hero Illustration */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-linear-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 transform rotate-3">
                  <div className="space-y-6">
                    {/* Carte de cours active */}
                    <div className="relative p-6 bg-linear-to-br from-primary-500 to-primary-700 rounded-2xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <TbMath className="w-8 h-8 text-white" />
                          </div>
                          <div className='flex'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Root-rendered-by-TeX.svg" className='w-25' alt="" />
                            <span className='text-green-600 text-9xl'>/</span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/2StirlingNumbersProp0.svg"  alt="" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div className="bg-linear-to-r from-emerald-300 to-emerald-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  
                  </div>
                </div>
              </div>
              
              {/* Effets décoratifs */}
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-linear-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-linear-to-br from-blue-400 to-cyan-600 rounded-2xl opacity-20 blur-xl animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-linear-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
           
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tout ce dont vous avez besoin pour{' '} réussir
             
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme complète conçue pour optimiser votre apprentissage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Effet de carte */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-white rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                
                <div className="relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-transparent overflow-hidden">
                  {/* Effet de fond */}
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icône flottante */}
                  <div className="relative mb-8">
                    <div className={`absolute -top-4 left-8 w-20 h-20 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      {feature.icon}
                    </div>
                    <div className="absolute -inset-4 bg-linear-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    {feature.accent}
                  </div>
                  
                  <div className="relative pt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <Link
                      to={feature.path}
                      onClick={()=>window.scrollTo(0,0)}
                      className="group/link inline-flex items-center font-semibold"
                    >
                      <span className={`relative ${feature.color} group-hover/link:text-opacity-80 transition-colors`}>
                        Découvrir
                      </span>
                      <div className={`ml-3 p-2 rounded-full bg-linear-to-br ${feature.linear} group-hover/link:${feature.hoverlinear} transition-all duration-300`}>
                        <FiChevronRight className="w-4 h-4 text-white group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                  
                  {/* Ligne décorative */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-linear-to-r ${feature.linear} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
         
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg mb-6">
              <span className="text-sm font-semibold text-white w-12"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explorez nos{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-800">
                matières
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une large sélection de disciplines académiques pour nourrir votre curiosité
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.key}
                to={`/courses?subject=${subject.key}`}
                onClick={()=>window.scrollTo(0 , 0)}
                className="group relative"
              >
                <div className={`relative ${subject.bg} rounded-2xl p-6 text-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${subject.hover} overflow-hidden`}>
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icône avec fond linear */}
                  <div className="relative mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${subject.linear} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <div className="text-white">
                        {subject.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-gray-800 transition-colors">
                    {subject.name}
                  </h3>
                  
                  {/* Indicateur hover */}
                  <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-linear-to-r ${subject.linear} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/courses"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-600 border-2 border-primary-600 rounded-2xl hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary-500 to-primary-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className="relative">Découvrir tous les cours</span>
              <FiArrowRight className="ml-3 w-5 h-5 relative group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;