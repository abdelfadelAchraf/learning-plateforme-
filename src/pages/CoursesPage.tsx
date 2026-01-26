import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import type { Course, Subject } from "../types";
import CourseCard from "../courses/CourseCard";
import Spinner from "../components/utils/Spinner";

// Mock data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction aux Mathématiques",
    description:
      "Cours complet couvrant les bases des mathématiques avec exercices pratiques.",
    subject: "mathematics",
    chapters: [
      {
        id: "1-1",
        title: "Nombres et opérations",
        content: "...",
        order: 1,
      },
      {
        id: "1-2",
        title: "Algèbre élémentaire",
        content: "...",
        order: 2,
      },
    ],
  },
  {
    id: "2",
    title: "Physique Fondamentale",
    description:
      "Découvrez les principes de base de la mécanique et de la thermodynamique.",
    subject: "physics",
    chapters: [
      {
        id: "2-1",
        title: "Mécanique classique",
        content: "...",
        order: 1,
      },
      {
        id: "2-2",
        title: "Thermodynamique",
        content: "...",
        order: 2,
      },
    ],
  },
  {
    id: "3",
    title: "Chimie Organique",
    description:
      "Comprendre les bases de la chimie organique et les réactions chimiques.",
    subject: "chemistry",
    chapters: [
      {
        id: "3-1",
        title: "Introduction",
        content: "...",
        order: 1,
      },
      {
        id: "3-2",
        title: "Réactions organiques",
        content: "...",
        order: 2,
      },
    ],
  },
  {
    id: "4",
    title: "Programmation Python",
    description: "Apprenez les bases de la programmation avec Python.",
    subject: "computerScience",
    chapters: [
      {
        id: "4-1",
        title: "Syntaxe de base",
        content: "...",
        order: 1,
      },
      {
        id: "4-2",
        title: "Structures de contrôle",
        content: "...",
        order: 2,
      },
    ],
  },
];

const CoursesPage: React.FC = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">(
    "all",
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = courses;

    // Filtre par sujet
    if (selectedSubject !== "all") {
      result = result.filter((course) => course.subject === selectedSubject);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query),
      );
    }

    setFilteredCourses(result);
  }, [selectedSubject, selectedDifficulty, searchQuery, courses]);

  const subjects: (Subject | "all")[] = [
    "all",
    ...(Object.keys(t("subjects", { returnObjects: true })) as Subject[]),
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("courses.title")}
        </h1>
        <p className="text-lg text-gray-600">
          Explorez notre collection complète de cours dans différentes matières
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Search */}
          <div className="flex items-center relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("courses.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 py-3 w-full border border-black/20 focus:border-black/20  "
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={(e) =>
                setSelectedSubject(e.target.value as Subject | "all")
              }
              className="input-field border border-black/20 focus:border-black/20 py-3 "
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === "all"
                    ? t("courses.allSubjects")
                    : t(`subjects.${subject}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun cours trouvé
          </h3>
          <p className="text-gray-600 mb-6">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
      <button
        onClick={() => {
          setSelectedSubject("all");
          setSelectedDifficulty("all");
          setSearchQuery("");
        }}
        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};

export default CoursesPage;
