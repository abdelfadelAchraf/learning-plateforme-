import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FiClock,
  FiBarChart2,
  FiPlay,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import type { Exam, Subject } from "../types";
import Spinner from "../components/utils/Spinner";

const ExamsPage: React.FC = () => {
  const { t } = useTranslation();
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">(
    "all",
  );
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isTakingExam, setIsTakingExam] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    // Mock data
    const mockExams: Exam[] = [
      {
        id: "1",
        title: "Examen de Mathématiques - Niveau 1",
        description:
          "Testez vos connaissances en mathématiques de base avec cet examen de 60 minutes.",
        duration: 60,
        passingGrade: 70,
        subject: "mathematics",
        questions: [
          {
            id: "q1",
            question: "Quel est le résultat de 15 × 4?",
            type: "multiple-choice",
            options: ["45", "60", "75", "90"],
            correctAnswer: "60",
            points: 10,
          },
          {
            id: "q2",
            question: "Simplifiez la fraction 24/36",
            type: "short-answer",
            correctAnswer: "2/3",
            points: 15,
          },
          {
            id: "q3",
            question:
              "Un triangle rectangle a des côtés de 3 cm et 4 cm. Quelle est la longueur de l'hypoténuse?",
            type: "multiple-choice",
            options: ["5 cm", "6 cm", "7 cm", "8 cm"],
            correctAnswer: "5 cm",
            points: 20,
          },
        ],
      },
      {
        id: "2",
        title: "Examen de Physique - Mécanique",
        description:
          "Questions sur les principes fondamentaux de la mécanique classique.",
        duration: 90,
        passingGrade: 65,
        subject: "physics",
        questions: [
          {
            id: "q1",
            question: "Quelle est l'unité SI de la force?",
            type: "multiple-choice",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            correctAnswer: "Newton",
            points: 10,
          },
          {
            id: "q2",
            question: "La vitesse est une quantité vectorielle. Vrai ou faux?",
            type: "true-false",
            correctAnswer: "Vrai",
            points: 5,
          },
        ],
      },
      {
        id: "3",
        title: "Examen de Chimie - Bases",
        description: "Évaluez vos connaissances en chimie générale.",
        duration: 45,
        passingGrade: 60,
        subject: "chemistry",
        questions: [
          {
            id: "q1",
            question: "Combien d'électrons possède un atome d'oxygène neutre?",
            type: "multiple-choice",
            options: ["6", "8", "10", "16"],
            correctAnswer: "8",
            points: 10,
          },
        ],
      },
    ];

    setExams(mockExams);
    setFilteredExams(mockExams);
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = exams;

    if (selectedSubject !== "all") {
      result = result.filter((exam) => exam.subject === selectedSubject);
    }

    setFilteredExams(result);
  }, [selectedSubject, exams]);

  const startExam = (exam: Exam) => {
    setSelectedExam(exam);
    setIsTakingExam(true);
    setAnswers({});
  };

  useEffect(() => {
    if (!isTakingExam || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTakingExam, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const submitExam = () => {
    if (!selectedExam) return;

    // Calculer le score
    let totalScore = 0;
    let totalPoints = 0;

    selectedExam.questions.forEach((question) => {
      totalPoints += question.points;
      if (answers[question.id] === question.correctAnswer) {
        totalScore += question.points;
      }
    });

    setIsTakingExam(false);
    setSelectedExam(null);
    setTimeLeft(0);
    setAnswers({});
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("exams.title")}
        </h1>
        <p className="text-lg text-gray-600">
          Testez vos connaissances avec nos examens chronométrés
        </p>
      </div>

      {isTakingExam && selectedExam ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* En-tête de l'examen */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 bg-linear-to-r from-primary-50 to-primary-100 rounded-lg">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedExam.title}
              </h2>
              <p className="text-gray-600">{selectedExam.description}</p>
            </div>
            <div className="mt-4 md:mt-0 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">Temps restant</div>
            </div>
          </div>

          {/* Progression */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {Object.keys(answers).length + 1} sur{" "}
                {selectedExam.questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(
                  (Object.keys(answers).length /
                    selectedExam.questions.length) *
                    100,
                )}
                % complété
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-linear-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(Object.keys(answers).length / selectedExam.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {selectedExam.questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center font-semibold mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {question.question}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {question.points} points
                  </span>
                </div>

                {/* Options de réponse */}
                <div className="space-y-3">
                  {question.type === "true-false" ? (
                    <div className="flex space-x-4">
                      <button
                        onClick={() =>
                          setAnswers({ ...answers, [question.id]: "Vrai" })
                        }
                        className={`px-6 py-3 rounded-lg border transition-all duration-200 ${
                          answers[question.id] === "Vrai"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 hover:border-green-300 hover:bg-green-50"
                        }`}
                      >
                        Vrai
                      </button>
                      <button
                        onClick={() =>
                          setAnswers({ ...answers, [question.id]: "Faux" })
                        }
                        className={`px-6 py-3 rounded-lg border transition-all duration-200 ${
                          answers[question.id] === "Faux"
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-300 hover:border-red-300 hover:bg-red-50"
                        }`}
                      >
                        Faux
                      </button>
                    </div>
                  ) : question.type === "multiple-choice" ? (
                    <div className="space-y-2">
                      {question.options?.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() =>
                            setAnswers({ ...answers, [question.id]: option })
                          }
                          className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                            answers[question.id] === option
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                                answers[question.id] === option
                                  ? "border-primary-500 bg-primary-500"
                                  : "border-gray-400"
                              }`}
                            >
                              {answers[question.id] === option && (
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
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          [question.id]: e.target.value,
                        })
                      }
                      placeholder="Écrivez votre réponse ici..."
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir quitter l'examen ? Votre progression sera perdue.",
                    )
                  ) {
                    setIsTakingExam(false);
                    setSelectedExam(null);
                    setTimeLeft(0);
                  }
                }}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quitter l'examen
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    if (
                      Object.keys(answers).length <
                      selectedExam.questions.length
                    ) {
                      alert(
                        `Il reste ${selectedExam.questions.length - Object.keys(answers).length} questions sans réponse.`,
                      );
                    } else if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir soumettre votre examen ?",
                      )
                    ) {
                      submitExam();
                    }
                  }}
                  className="px-8 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold"
                >
                  Soumettre l'examen
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Filtres */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Filtrer les examens
                </h3>
                <select
                  value={selectedSubject}
                  onChange={(e) =>
                    setSelectedSubject(e.target.value as Subject | "all")
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {filteredExams.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Examens disponibles
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des examens */}
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                        {t(`subjects.${exam.subject}`)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {exam.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {exam.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <FiCheck className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-700">
                            {exam.questions.length} questions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      onClick={() => startExam(exam)}
                      className="w-full py-3 bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold flex items-center justify-center"
                    >
                      <FiPlay className="w-4 h-4 mr-2" />
                      Commencer l'examen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun examen disponible
              </h3>
              <p className="text-gray-600 mb-6">
                Aucun examen ne correspond à vos critères de recherche
              </p>
              <button
                onClick={() => setSelectedSubject("all")}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Afficher tous les examens
              </button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Instructions importantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FiClock className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Temps limité
                </h4>
                <p className="text-gray-700">
                  Chaque examen a une durée déterminée. Le chronomètre ne
                  s'arrête pas.
                </p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Note de passage
                </h4>
                <p className="text-gray-700">
                  Vous devez obtenir au moins la note de passage spécifiée pour
                  réussir.
                </p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FiAlertCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Pas de retour en arrière
                </h4>
                <p className="text-gray-700">
                  Une fois soumis, vous ne pouvez plus modifier vos réponses.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamsPage;
