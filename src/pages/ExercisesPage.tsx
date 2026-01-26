import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FiSearch,
  FiFilter,
  FiHelpCircle,
} from "react-icons/fi";
import type { Exercise, Subject } from "../types";
import Spinner from "../components/utils/Spinner";

const ExercisesPage: React.FC = () => {
  const { t } = useTranslation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Mock data
    const mockExercises: Exercise[] = [
      {
        id: "1",
        title: "Addition de fractions",
        question: "Calculez: 3/4 + 2/3 = ?",
        type: "text",
        correctAnswer: "17/12",
        explanation:
          "Pour additionner des fractions, on les réduit au même dénominateur. 3/4 = 9/12 et 2/3 = 8/12, donc 9/12 + 8/12 = 17/12.",
        points: 10,
        difficulty: 2,
        subject: "mathematics",
      },
      {
        id: "2",
        title: "Équation du second degré",
        question: "Résolvez l'équation: x² - 5x + 6 = 0",
        type: "multiple-choice",
        options: [
          "x = 2 et x = 3",
          "x = 1 et x = 6",
          "x = -2 et x = -3",
          "Pas de solution",
        ],
        correctAnswer: "x = 2 et x = 3",
        explanation:
          "Le discriminant Δ = b² - 4ac = 25 - 24 = 1. Les solutions sont x₁ = (5-1)/2 = 2 et x₂ = (5+1)/2 = 3.",
        points: 15,
        difficulty: 3,
        subject: "mathematics",
      },
      {
        id: "3",
        title: "Loi de Newton",
        question:
          "Selon la deuxième loi de Newton, quelle est la relation entre force, masse et accélération?",
        type: "multiple-choice",
        options: ["F = m/a", "F = m × a", "F = m + a", "F = m - a"],
        correctAnswer: "F = m × a",
        explanation:
          "La deuxième loi de Newton énonce que la force résultante appliquée à un objet est égale à la masse de l'objet multipliée par son accélération.",
        points: 10,
        difficulty: 2,
        subject: "physics",
      },
      {
        id: "4",
        title: "Structure atomique",
        question: "Combien de protons possède un atome de carbone (C)?",
        type: "text",
        correctAnswer: "6",
        explanation:
          "Le carbone a un numéro atomique de 6, ce qui signifie qu'il possède 6 protons dans son noyau.",
        points: 5,
        difficulty: 1,
        subject: "chemistry",
      },
    ];

    setExercises(mockExercises);
    setFilteredExercises(mockExercises);
    setSelectedExercise(mockExercises[0]);

    //  similate fetching data
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = exercises;

    if (selectedSubject !== "all") {
      result = result.filter((ex) => ex.subject === selectedSubject);
    }

  

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (ex) =>
          ex.title.toLowerCase().includes(query) ||
          ex.question.toLowerCase().includes(query),
      );
    }

    setFilteredExercises(result);
    if (
      result.length > 0 &&
      !result.find((e) => e.id === selectedExercise?.id)
    ) {
      setSelectedExercise(result[0]);
    }
  }, [selectedSubject, searchQuery, exercises]);

  

  

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("exercises.title")}
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
                    onChange={(e) =>
                      setSelectedSubject(e.target.value as Subject | "all")
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Toutes les matières</option>
                    {Object.entries(t("subjects", { returnObjects: true })).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Liste */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">
                Exercices disponibles ({filteredExercises.length})
              </h3>
              <div className="space-y-3 max-h-125 overflow-y-auto pr-2">
                {filteredExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setShowResult(false);
                    }}
                    className={`w-full text-left p-4  transition-all duration-200 ${
                      selectedExercise?.id === exercise.id
                        ? "bg-primary-50 border-l-4 border-primary-500"
                        : "hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {exercise.title}
                        </h4>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-primary-600">
                            {t(`subjects.${exercise.subject}`)}
                          </span>
                        </div>
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
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedExercise.title}
                  </h2>
                </div>
              </div>

              {/* body goes here  */}
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
