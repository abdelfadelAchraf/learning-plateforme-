import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FiSearch,
  FiFilter,
  FiHelpCircle,
} from "react-icons/fi";
import type { Exercise, Subject } from "../types";
import Spinner from "../components/utils/Spinner";
import { useQuery } from "@apollo/client/react";
import { GET_EXERCISES } from "../graphql/queries/exercices";

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

  // GraphQL Query
  const { data, loading: graphqlLoading, error } = useQuery<{exercises:Exercise[]}>(GET_EXERCISES, {
    variables: selectedSubject !== "all" 
      ? { subject: selectedSubject } 
      : {},
  });

  useEffect(() => {
    if (data?.exercises && !graphqlLoading) {
      const fetchedExercises = data.exercises;
      setExercises(fetchedExercises);
      setFilteredExercises(fetchedExercises);
      if (fetchedExercises.length > 0) {
        setSelectedExercise(fetchedExercises[0]);
      }
      setLoading(false);
    }
  }, [data, graphqlLoading]);

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
  }, [selectedSubject, searchQuery, exercises, selectedExercise]);

  if (loading || graphqlLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-600">
            {error.message}
          </p>
        </div>
      </div>
    );
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