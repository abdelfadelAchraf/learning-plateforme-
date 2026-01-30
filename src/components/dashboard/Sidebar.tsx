import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBookOpen,
  FiFileText,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
 const { user, logout } = useAuth();
  const menuItems = [
    { path: "/dashboard", icon: FiGrid, label: "Dashboard" },
    { path: "/dashboard/admin/courses", icon: FiBookOpen, label: "Cours" },
    { path: "/dashboard/admin/exercises", icon: FiFileText, label: "Exercices" },
    { path: "/dashboard/admin/exams", icon: FiClipboard, label: "Examens" },
    { path: "/dashboard/admin/users", icon: FiUsers, label: "Utilisateurs" },
    { path: "/dashboard/admin/settings", icon: FiSettings, label: "Paramètres" },
  ];

  const subjects = [
    "mathematics",
    "physics",
    "chemistry",
    "biology",
    "computerScience",
    "history",
    "geography",
    "languages",
  ];

  const getSubjectLabel = (subject: string) => {
    const labels: Record<string, string> = {
      mathematics: "Mathématiques",
      physics: "Physique",
      chemistry: "Chimie",
      biology: "Biologie",
      computerScience: "Informatique",
      history: "Histoire",
      geography: "Géographie",
      languages: "Langues",
    };
    return labels[subject] || subject;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-primary-600">EduManager</h1>
            <p className="text-sm text-gray-500">Dashboard Administratif</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Navigation
              </p>

              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Subjects */}
            <div className="mt-8">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Matières
              </p>

              <div className="mt-2 space-y-1">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span>{getSubjectLabel(subject)}</span>
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
