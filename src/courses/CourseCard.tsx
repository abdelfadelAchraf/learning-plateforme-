import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import type { Course } from "../types";
import Latex from "react-latex";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t } = useTranslation();

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "mathematics":
        return "🧮";
      case "physics":
        return "⚛️";
      case "chemistry":
        return "🧪";
      case "biology":
        return "🧬";
      case "computerScience":
        return "💻";
      case "history":
        return "📜";
      case "geography":
        return "🌍";
      case "languages":
        return "🗣️";
      default:
        return "📚";
    }
  };

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group bg-white rounded-md overflow-hidden  border border-black cardShadow"
    >
      {/* Course Header */}
      <div className="relative">
        <div className="h-48 bg-linear-to-br from-primary-500 to-primary-700 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-20">
              {getSubjectIcon(course.subject)}
            </span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-primary-600">
            {t(`subjects.${course.subject}`)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
           <Suspense fallback={<div>Loading Latex...</div>}>
                  <Latex>{course.title}</Latex>
                </Suspense>
          
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>

  
      </div>
    </Link>
  );
};

export default CourseCard;
