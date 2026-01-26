import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiBookOpen, FiPlay, FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import type { Chapter, Course } from '../types';
import Spinner from '../components/utils/Spinner';
const coursesData = [
  {
    "id": "1",
    "title": "Introduction aux Mathématiques",
    "description": "Cours complet couvrant les bases des mathématiques avec exercices pratiques et démonstrations détaillées.",
    "subject": "mathematics",
    "chapters": [
      {
        "id": "1-1",
        "title": "Chapitre 1 : Nombres et Opérations",
        "content": "# Nombres et Opérations\n\n## Introduction\nLes nombres sont les éléments fondamentaux des mathématiques.\n\n### 1. Types de Nombres\n- **Nombres naturels** : 0, 1, 2, 3, ...\n- **Nombres entiers** : ..., -3, -2, -1, 0, 1, 2, 3, ...\n- **Nombres rationnels** : nombres qui peuvent s'exprimer comme fraction (ex: 1/2, 3/4)\n- **Nombres réels** : incluent tous les nombres rationnels et irrationnels\n\n### 2. Opérations de Base\n1. **Addition** : a + b\n2. **Soustraction** : a - b\n3. **Multiplication** : a × b\n4. **Division** : a ÷ b\n\n### 3. Propriétés des Opérations\n- **Commutativité** : a + b = b + a\n- **Associativité** : (a + b) + c = a + (b + c)\n- **Distributivité** : a × (b + c) = a×b + a×c\n\n## Exemples Pratiques\n```python\n# Exemple de calcul\ndef addition(a, b):\n    return a + b\n\nresult = addition(5, 3)  # Retourne 8\n```\n\n## Exercice\nCalculez: 12 × (3 + 4) - 8 ÷ 2",
        "order": 1,
        "duration": 60
      },
      {
        "id": "1-2",
        "title": "Chapitre 2 : Algèbre Élémentaire",
        "content": "# Algèbre Élémentaire\nContenu du chapitre 2 avec formules et exemples.\n\n```python\nx = 2\ny = 3\nz = x + y\nprint(z)  # 5\n```",
        "order": 2,
        "duration": 90
      },
      {
        "id": "1-3",
        "title": "Chapitre 3 : Géométrie de Base #",
        "content": "# Géométrie de Base\nApprenez les formes et calculs de base.\n\n- Triangles\n- Cercles\n- Rectangles",
        "order": 3,
        "duration": 75
      }
    ]
  }
]

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load course by id
    const foundCourse = coursesData.find(c => c.id === id) || null;
    setCourse(foundCourse as Course | null);
    setSelectedChapter(foundCourse?.chapters[0] || null);
   setInterval(() => {
     setLoading(false);
   }, 1000);
  }, [id]);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  const handleNextChapter = () => {
    if (!course || !selectedChapter) return;
    const idx = course.chapters.findIndex(c => c.id === selectedChapter.id);
    if (idx < course.chapters.length - 1) {
      setSelectedChapter(course.chapters[idx + 1]);
    }
  };

  const handlePreviousChapter = () => {
    if (!course || !selectedChapter) return;
    const idx = course.chapters.findIndex(c => c.id === selectedChapter.id);
    if (idx > 0) {
      setSelectedChapter(course.chapters[idx - 1]);
    }
  };

  if (loading) {return <Spinner/>}
  if (!course) return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold">Cours non trouvé</h2>
      <button onClick={() => navigate('/courses')} className="px-6 py-3 bg-primary-600 text-white rounded-lg mt-4">
        Retour aux cours
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Retour aux cours
          </button>
          <h1 className="text-xl font-bold">{course.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 space-y-4">
            <h2 className="font-bold text-lg">Chapitres</h2>
            {course.chapters.map(ch => (
              <button
                key={ch.id}
                onClick={() => handleChapterSelect(ch)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedChapter?.id === ch.id ? 'bg-primary-50 border-l-4 border-primary-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedChapter?.id === ch.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <FiPlay className="w-3 h-3" />
                  </div>
                  <span>{ch.title}</span>
                </div>
              </button>
            ))}
            <div className="border-t pt-4 mt-4">
              <p>Matière: {t(`subjects.${course.subject}`)}</p>
              <p>Chapitres: <FiBookOpen className="inline w-4 h-4" /> {course.chapters.length}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">{selectedChapter?.title}</h2>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="prose lg:prose-xl max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>
                {selectedChapter?.content ?? ''}
              </Markdown>
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
