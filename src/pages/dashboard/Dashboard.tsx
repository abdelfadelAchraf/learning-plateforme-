import React from "react";
import { useQuery } from "@apollo/client/react";

import { FiBookOpen, FiFileText, FiClipboard, FiUsers } from "react-icons/fi";
import { GET_DASHBOARD_STATS } from "../../graphql/queries/dashboard";
import StatsCard from "../../components/StatsCard";

const Dashboard: React.FC = () => {
  const { data, loading, error } = useQuery(GET_DASHBOARD_STATS, {
    pollInterval: 5000,
    notifyOnNetworkStatusChange: false,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erreur: {error.message}</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Cours",
      value: data?.totalCourses?.length || 0,
      icon: FiBookOpen,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Exercices",
      value: data?.totalExercises?.length || 0,
      icon: FiFileText,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Total Examens",
      value: data?.totalExams?.length || 0,
      icon: FiClipboard,
      color: "bg-purple-500",
      change: "+15%",
    },
    {
      title: "Total Utilisateurs",
      value: data?.totalUsers?.length || 0,
      icon: FiUsers,
      color: "bg-orange-500",
      change: "+5%",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Gérez vos cours, exercices et examens depuis un seul endroit
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Courses */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Cours Récents</h2>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {data?.totalCourses?.slice(0, 3).map((course: any) => (
              <div
                key={course.id}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FiBookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-500">
                    {course.chapters?.length || 0} chapitres
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <FiBookOpen className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Nouveau Cours</span>
            </button>
            <button className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <FiFileText className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Nouvel Exercice</span>
            </button>
            <button className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <FiClipboard className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Nouvel Examen</span>
            </button>
            <button className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <FiUsers className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Voir Utilisateurs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
