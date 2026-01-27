import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import type { Course, Subject } from "../types";
import CourseCard from "../courses/CourseCard";
import Spinner from "../components/utils/Spinner";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES } from "../graphql/queries/courses";
import usePageTitle from "../hooks/usePageTitle";

const CoursesPage: React.FC = () => {
  usePageTitle("Courses | Learning Platform");

  const { t } = useTranslation();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">(
    "all",
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // GraphQL Query
  const { data, loading, error } = useQuery<{ courses: Course[] }>(
    GET_COURSES,
    {
      variables: selectedSubject !== "all" ? { subject: selectedSubject } : {},
      pollInterval: 5000,
      notifyOnNetworkStatusChange: false,
    },
  );

  useEffect(() => {
    if (data?.courses) {
      let result = data.courses;

      // Filtre par recherche
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (course: Course) =>
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query),
        );
      }

      setFilteredCourses(result);
    }
  }, [data, searchQuery, selectedDifficulty, selectedSubject]);

  const subjects: (Subject | "all")[] = [
    "all",
    ...(Object.keys(t("subjects", { returnObjects: true })) as Subject[]),
  ];

  if (loading || error) {
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
              className="input-field pl-10 py-3 w-full border border-black/20 focus:border-black/20"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={(e) =>
                setSelectedSubject(e.target.value as Subject | "all")
              }
              className="input-field border border-black/20 focus:border-black/20 py-3 w-full"
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
