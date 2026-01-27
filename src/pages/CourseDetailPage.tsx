import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  FiBookOpen,
  FiPlay,
  FiArrowLeft,
  FiChevronRight,
} from "react-icons/fi";
import type { Chapter, Course } from "../types";
import Spinner from "../components/utils/Spinner";
import { useQuery } from "@apollo/client/react";
import { GET_COURSE_BY_ID } from "../graphql/queries/courses";
import Latex from "react-latex";

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // GraphQL Query
  const { data, loading, error } = useQuery<{ course: Course }>(
    GET_COURSE_BY_ID,
    {
      variables: { id },
      skip: !id,
    },
  );

  const course = data?.course as Course | null;

  useEffect(() => {
    if (course?.chapters && course.chapters.length > 0) {
      setSelectedChapter(course.chapters[0]);
    }
  }, [course]);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  const handleNextChapter = () => {
    if (!course || !selectedChapter) return;
    const idx = course.chapters.findIndex((c) => c.id === selectedChapter.id);
    if (idx < course.chapters.length - 1) {
      setSelectedChapter(course.chapters[idx + 1]);
    }
  };

  const handlePreviousChapter = () => {
    if (!course || !selectedChapter) return;
    const idx = course.chapters.findIndex((c) => c.id === selectedChapter.id);
    if (idx > 0) {
      setSelectedChapter(course.chapters[idx - 1]);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg"
          >
            Retour aux cours
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Cours non trouvé</h2>
          <p className="text-gray-600 mb-6">
            Le cours que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg"
          >
            Retour aux cours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative ">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Retour aux cours
          </button>
          <h1 className="text-xl font-bold">
            <Suspense fallback={<p>...</p>}>
              <Latex>{course.title}</Latex>
            </Suspense>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 h-[calc(100vh-120px)] grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1   ">
          <div className="sticky top-24 h-fit max-h-[80vh] overflow-y-auto bg-gray-200 p-6 shadow-lg space-y-4">
            <h2 className="font-bold text-lg">Chapitres</h2>
            {course.chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleChapterSelect(ch)}
                className={`w-full text-left p-3  transition-colors ${
                  selectedChapter?.id === ch.id
                    ? "bg-violet-300   border-l-4 border-primary-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 ">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedChapter?.id === ch.id
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FiPlay className="w-3 h-3 text-violet-600" />
                  </div>
                  <Latex>{ch.title}</Latex>
                </div>
              </button>
            ))}
            <div className="border-t pt-4 mt-4">
              <p>Matière: {t(`subjects.${course.subject}`)}</p>
              <p>
                Chapitres: <FiBookOpen className="inline w-4 h-4" />{" "}
                {course.chapters.length}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2">
          <div className="bg-white p-6  shadow-lg">
            <h2 className="text-2xl font-bold">
              <Latex>{selectedChapter?.title}</Latex>
            </h2>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="prose lg:prose-xl max-w-none">
              <div
                className="prose lg:prose-xl max-w-none
             [&_.katex-display]:bg-gray-50
             [&_.katex-display]:p-2
             [&_.katex-display]:border
             [&_.katex]:text-violet-700"
              >
                {/* <Markdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    // Style pour le code inline
                    code({ node, inline, className, children, ...props }) {
                      if (inline) {
                        return (
                          <code
                            className="bg-violet-100 text-violet-800 px-2 py-1 rounded-md text-sm font-mono font-medium border border-violet-200"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }

                      // Détecter le langage de programmation
                      const match = /language-(\w+)/.exec(className || "");
                      const language = match ? match[1] : "";

                      return (
                        <div className="relative bg-red-300 my-6 rounded-xl overflow-hidden shadow-sm">
                          {language && (
                            <div className="absolute top-0 right-0 bg-green-400 text-gray-100 text-xs font-mono px-3 py-1 rounded-bl-lg">
                              {language}
                            </div>
                          )}
                          <pre className="bg-gray-900 text-gray-100 p-5 overflow-x-auto text-sm leading-relaxed">
                            <code
                              className={`font-mono ${className || ""}`}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },

                    // Style pour les titres
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-3xl font-bold mt-8 mb-4 pb-3 border-b border-gray-200 text-gray-900"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-2xl font-bold mt-7 mb-3 text-gray-800"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-xl font-semibold mt-6 mb-3 text-gray-700"
                        {...props}
                      />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        className="text-lg font-semibold mt-5 mb-2 text-gray-700"
                        {...props}
                      />
                    ),

                    // Style pour les paragraphes
                    p: ({ node, ...props }) => (
                      <p
                        className="text-gray-700 leading-relaxed mb-4 text-base"
                        {...props}
                      />
                    ),

                    // Style pour les listes
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-5 mb-4 text-gray-700 space-y-1"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal pl-5 mb-4 text-gray-700 space-y-1"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="pl-1 mb-1" {...props} />
                    ),

                    // Style pour les blockquotes
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-primary-500 bg-primary-50 pl-5 py-3 pr-4 my-6 italic text-gray-700 rounded-r-lg"
                        {...props}
                      />
                    ),

                    // Style pour les liens
                    a: ({ node, ...props }) => (
                      <a
                        className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors font-medium"
                        {...props}
                      />
                    ),

                    // Style pour les tableaux
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
                        <table
                          className="min-w-full divide-y divide-gray-200"
                          {...props}
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-4 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        className="px-4 py-3 text-sm text-gray-700 border-b"
                        {...props}
                      />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr
                        className="hover:bg-gray-50 transition-colors"
                        {...props}
                      />
                    ),

                    // Style pour les images
                    img: ({ node, ...props }) => (
                      <div className="my-8 flex justify-center">
                        <img
                          className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
                          {...props}
                          alt={props.alt || ""}
                        />
                      </div>
                    ),

                    // Style pour le texte fort (bold)
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-gray-900" {...props} />
                    ),

                    // Style pour le texte emphase (italic)
                    em: ({ node, ...props }) => (
                      <em className="italic text-gray-800" {...props} />
                    ),

                    // Style pour les séparateurs horizontaux
                    hr: ({ node, ...props }) => (
                      <hr
                        className="my-8 border-t border-gray-300"
                        {...props}
                      />
                    ),
                  }}
                >
                  {selectedChapter?.content ?? ""}
                </Markdown> */}

                <Markdown
                  rehypePlugins={[rehypeKatex]}
                  remarkPlugins={[remarkGfm, remarkMath]}
                  // rehypePlugins={[rehypeKatex]}
                 
                >
                  {selectedChapter?.content ?? ""}
                </Markdown>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousChapter}
              disabled={selectedChapter?.order === 1}
              className="px-6 py-3 rounded-lg bg-gray-100 disabled:opacity-50"
            >
              <FiArrowLeft className="inline mr-2" /> Chapitre précédent
            </button>
            <span className="text-gray-600">
              Chapitre {selectedChapter?.order} sur {course.chapters.length}
            </span>
            <button
              onClick={handleNextChapter}
              disabled={selectedChapter?.order === course.chapters.length}
              className="px-6 py-3 rounded-lg bg-primary-600 text-white disabled:opacity-50"
            >
              Chapitre suivant <FiChevronRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
