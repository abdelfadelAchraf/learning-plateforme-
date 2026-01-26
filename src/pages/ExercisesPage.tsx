import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiFilter, FiCheckCircle, FiXCircle, FiHelpCircle, FiTarget } from 'react-icons/fi';
import type { Exercise, Subject } from '../types';

const ExercisesPage: React.FC = () => {
  const { t } = useTranslation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Mock data
    const mockExercises: Exercise[] = [
      {
        id: '1',
        title: 'Addition de fractions',
        question: 'Calculez: 3/4 + 2/3 = ?',
        type: 'text',
        correctAnswer: '17/12',
        explanation: 'Pour additionner des fractions, on les réduit au même dénominateur. 3/4 = 9/12 et 2/3 = 8/12, donc 9/12 + 8/12 = 17/12.',
        points: 10,
        difficulty: 2,
        subject: 'mathematics',
      },
      {
        id: '2',
        title: 'Équation du second degré',
        question: 'Résolvez l\'équation: x² - 5x + 6 = 0',
        type: 'multiple-choice',
        options: ['x = 2 et x = 3', 'x = 1 et x = 6', 'x = -2 et x = -3', 'Pas de solution'],
        correctAnswer: 'x = 2 et x = 3',
        explanation: 'Le discriminant Δ = b² - 4ac = 25 - 24 = 1. Les solutions sont x₁ = (5-1)/2 = 2 et x₂ = (5+1)/2 = 3.',
        points: 15,
        difficulty: 3,
        subject: 'mathematics',
      },
      {
        id: '3',
        title: 'Loi de Newton',
        question: 'Selon la deuxième loi de Newton, quelle est la relation entre force, masse et accélération?',
        type: 'multiple-choice',
        options: ['F = m/a', 'F = m × a', 'F = m + a', 'F = m - a'],
        correctAnswer: 'F = m × a',
        explanation: 'La deuxième loi de Newton énonce que la force résultante appliquée à un objet est égale à la masse de l\'objet multipliée par son accélération.',
        points: 10,
        difficulty: 2,
        subject: 'physics',
      },
      {
        id: '4',
        title: 'Structure atomique',
        question: 'Combien de protons possède un atome de carbone (C)?',
        type: 'text',
        correctAnswer: '6',
        explanation: 'Le carbone a un numéro atomique de 6, ce qui signifie qu\'il possède 6 protons dans son noyau.',
        points: 5,
        difficulty: 1,
        subject: 'chemistry',
      },
    ];

    setExercises(mockExercises);
    setFilteredExercises(mockExercises);
    setSelectedExercise(mockExercises[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = exercises;

    if (selectedSubject !== 'all') {
      result = result.filter(ex => ex.subject === selectedSubject);
    }

    if (selectedDifficulty !== 'all') {
      result = result.filter(ex => ex.difficulty === parseInt(selectedDifficulty));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ex =>
        ex.title.toLowerCase().includes(query) ||
        ex.question.toLowerCase().includes(query)
      );
    }

    setFilteredExercises(result);
    if (result.length > 0 && !result.find(e => e.id === selectedExercise?.id)) {
      setSelectedExercise(result[0]);
    }
  }, [selectedSubject, selectedDifficulty, searchQuery, exercises]);

  const handleSubmit = () => {
    if (!selectedExercise || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === selectedExercise.correctAnswer.toLowerCase();
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + selectedExercise.points);
    }
  };

  const handleNextExercise = () => {
    if (!selectedExercise) return;

    const currentIndex = filteredExercises.findIndex(e => e.id === selectedExercise.id);
    const nextIndex = (currentIndex + 1) % filteredExercises.length;
    setSelectedExercise(filteredExercises[nextIndex]);
    setUserAnswer('');
    setShowResult(false);
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('exercises.title')}
        </h1>
        <p className="text-lg text-gray-600">
          Pratiquez avec nos exercices interactifs et améliorez vos compétences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des exercices */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            {/* Filtres */}
            <div className="mb-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Rechercher un exercice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <FiSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiFilter className="inline-block mr-2" />
                    Matière
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value as Subject | 'all')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Toutes les matières</option>
                    {Object.entries(t('subjects', { returnObjects: true })).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulté
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Tous niveaux</option>
                    <option value="1">★☆☆☆☆ - Très facile</option>
                    <option value="2">★★☆☆☆ - Facile</option>
                    <option value="3">★★★☆☆ - Moyen</option>
                    <option value="4">★★★★☆ - Difficile</option>
                    <option value="5">★★★★★ - Très difficile</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Liste */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">
                Exercices disponibles ({filteredExercises.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setUserAnswer('');
                      setShowResult(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedExercise?.id === exercise.id
                        ? 'bg-primary-50 border-l-4 border-primary-500'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{exercise.title}</h4>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-primary-600">
                            {t(`subjects.${exercise.subject}`)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                            {getDifficultyStars(exercise.difficulty)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{exercise.points} pts</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zone d'exercice */}
        <div className="lg:col-span-2">
          {selectedExercise ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* En-tête */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                      {t(`subjects.${selectedExercise.subject}`)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedExercise.difficulty)}`}>
                      {getDifficultyStars(selectedExercise.difficulty)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.title}</h2>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Points</div>
                  <div className="text-2xl font-bold text-primary-600">{selectedExercise.points}</div>
                </div>
              </div>

              {/* Score */}
              <div className="mb-8 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiTarget className="w-6 h-6 text-primary-600 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Votre score</div>
                      <div className="text-2xl font-bold text-gray-900">{score} points</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Exercices complétés</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {filteredExercises.findIndex(e => e.id === selectedExercise.id) + 1}/{filteredExercises.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <FiHelpCircle className="w-6 h-6 text-primary-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Question</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-lg text-gray-800">{selectedExercise.question}</p>
                </div>
              </div>

              {/* Réponse */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Votre réponse</h3>
                
                {selectedExercise.type === 'multiple-choice' ? (
                  <div className="space-y-3">
                    {selectedExercise.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setUserAnswer(option)}
                        className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                          userAnswer === option
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                            userAnswer === option
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-400'
                          }`}>
                            {userAnswer === option && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Écrivez votre réponse ici..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                )}
              </div>

              {/* Résultat */}
              {showResult && (
                <div className={`mb-8 p-6 rounded-lg ${
                  userAnswer.trim().toLowerCase() === selectedExercise.correctAnswer.toLowerCase()
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start mb-4">
                    {userAnswer.trim().toLowerCase() === selectedExercise.correctAnswer.toLowerCase() ? (
                      <FiCheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                    ) : (
                      <FiXCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        userAnswer.trim().toLowerCase() === selectedExercise.correctAnswer.toLowerCase()
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {userAnswer.trim().toLowerCase() === selectedExercise.correctAnswer.toLowerCase()
                          ? 'Bonne réponse ! 🎉'
                          : 'Réponse incorrecte'}
                      </h4>
                      <p className="text-gray-700">
                        <strong>Réponse correcte :</strong> {selectedExercise.correctAnswer}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Explication :</h5>
                    <p className="text-gray-700">{selectedExercise.explanation}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setUserAnswer('');
                    setShowResult(false);
                  }}
                  className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Réinitialiser
                </button>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      !userAnswer.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {showResult ? 'Vérifier à nouveau' : 'Vérifier la réponse'}
                  </button>
                  
                  {showResult && (
                    <button
                      onClick={handleNextExercise}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold"
                    >
                      Exercice suivant →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHelpCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun exercice sélectionné
              </h3>
              <p className="text-gray-600">
                Sélectionnez un exercice dans la liste pour commencer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;