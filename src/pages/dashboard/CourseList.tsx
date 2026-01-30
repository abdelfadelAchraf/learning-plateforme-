import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { Link } from 'react-router-dom';

import {type Subject, type Course } from '../../types';
import { DELETE_COURSE, GET_COURSES } from '../../graphql';
import {
  FiBookOpen,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import ActionNotification from '../../components/utils/ActionNotification';
// Import the component

const CourseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | ''>('');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState<{id: string, title: string} | null>(null);
  
  const { data, loading, error, refetch } = useQuery<{courses:Course[]}>(GET_COURSES, {
    variables: { subject: selectedSubject || undefined },
  });

  console.log("data" , data)
  
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onCompleted: () => {
      setDeleteSuccess(true);
      refetch();
      setShowDeleteModal(null);
      setDeletingCourse(null);
    },
    onError: (err) => {
      console.error('Erreur lors de la suppression:', err);
      setShowDeleteModal(null);
      setDeletingCourse(null);
    },
  });

  const handleDeleteClick = (id: string, title: string) => {
    setShowDeleteModal(id);
    setDeletingCourse({id, title});
  };

  const confirmDelete = () => {
    if (deletingCourse) {
      deleteCourse({ variables: { id: deletingCourse.id } });
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(null);
    setDeletingCourse(null);
  };

  const getSubjectLabel = (subject: Subject) => {
    const labels: Record<Subject, string> = {
      mathematics: 'Mathématiques',
      physics: 'Physique',
      chemistry: 'Chimie',
      biology: 'Biologie',
      computerScience: 'Informatique',
      history: 'Histoire',
      geography: 'Géographie',
      languages: 'Langues',
    };
    return labels[subject];
  };

  const filteredCourses = data?.courses?.filter((course: any) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error) return <div className="text-red-600">Erreur: {error.message}</div>;

  return (
    <div>
      {/* Show success notification when delete is successful */}
      {deleteSuccess && (
        <ActionNotification 
          type="Success" 
          message="Cours supprimé avec succès!" 
        />
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && deletingCourse && (
        <ActionNotification 
          type="Delete" 
          message="Supprimer le cours"
          description={`Êtes-vous sûr de vouloir supprimer "${deletingCourse.title}" ? Cette action est irréversible.`}
          showAs="modal"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cours</h1>
          <p className="text-gray-600 mt-1">
            Gérer tous vos cours et chapitres
          </p>
        </div>
        <Link
          to="/courses/new"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Nouveau Cours
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as Subject | '')}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              >
                <option value="">Toutes les matières</option>
                {Object.values<Subject>([
                  'mathematics',
                  'physics',
                  'chemistry',
                  'biology',
                  'computerScience',
                  'history',
                  'geography',
                  'languages',
                ]).map((subject) => (
                  <option key={subject} value={subject}>
                    {getSubjectLabel(subject)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses?.map((course: any) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <FiBookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {getSubjectLabel(course.subject)}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>{course.chapters?.length || 0} chapitres</span>
                <span>
                  {new Date(course.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Link
                    to={`/courses/${course.id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Voir"
                  >
                    <FiBookOpen className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/courses/${course.id}/edit`}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </Link>
                  {/* Changed: Use handleDeleteClick instead of handleDelete */}
                  <button
                    onClick={() => handleDeleteClick(course.id, course.title)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-primary-600 text-sm font-medium hover:text-primary-700"
                >
                  Voir détails →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border">
          <FiBookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun cours trouvé</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedSubject
              ? "Aucun résultat ne correspond à vos critères de recherche."
              : "Commencez par créer votre premier cours."}
          </p>
          <Link
            to="/courses/new"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Créer un cours
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseList;