import React, { Activity, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";

// Layout
import Layout from "./components/Layout/Layout";
import i18n from "./locales/i18n";
import ScrollToTop from "./components/utils/ScrollToTop";
import usePageTitle from "./hooks/usePageTitle";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/dashboard/Login";
import Logout from "./pages/dashboard/Logout";
import { ToastProvider } from "./contexts/ToastContext";
import Spinner from "./components/utils/Spinner";
import CourseList from "./pages/dashboard/CourseList";
// Pages (lazy loading)
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CoursesPage = React.lazy(() => import("./pages/CoursesPage"));
const CourseDetailPage = React.lazy(() => import("./pages/CourseDetailPage"));
const ExercisesPage = React.lazy(() => import("./pages/ExercisesPage"));
const ExamsPage = React.lazy(() => import("./pages/ExamsPage"));
// const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
// const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  usePageTitle("Home | Learning Platform");

  return (
    <main className="overflow-hidden px-3">
     
     
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <ToastProvider>
          <Router>
            <Layout>
              <Suspense
                fallback={
                  <Spinner/>
                }
              >
                <ScrollToTop />
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />

                  {/* Protected routes */}
                  <Route
                    path="/dashboard/home"
                    element={
                      <ProtectedRoute>
                        <Navigate to="/dashboard" replace />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />

                  <Route path="admin/courses">
                      <Route index element={<CourseList />} />
                      {/* <Route path="new" element={<CourseCreate />} /> */}
                      {/* <Route path=":id" element={<CourseDetail />} /> */}
                      {/* <Route path=":id/edit" element={<CourseEdit />} /> */}
                    </Route>
                      {/* <Route path="exercises">
                      <Route index element={<ExerciseList />} />
                      <Route path="new" element={<ExerciseCreate />} />
                      <Route path=":id/edit" element={<ExerciseEdit />} />
                    </Route>
                    <Route path="exams">
                      <Route index element={<ExamList />} />
                      <Route path="new" element={<ExamCreate />} />
                      <Route path=":id/edit" element={<ExamEdit />} />
                    </Route>
                    <Route path="users">
                      <Route index element={<UserList />} />
                    </Route> */}
                  </Route>

                  {/* Catch all - redirect to login */}
                  {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                  <Route path="*" element={<h1>Page not found </h1>} />

                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:id" element={<CourseDetailPage />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/exams" element={<ExamsPage />} />
                  {/*  <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
               */}
                </Routes>
              </Suspense>
            </Layout>
          </Router>
          </ToastProvider>
        </I18nextProvider>
      </AuthProvider>
    </main>
  );
};

export default App;
