import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

// Layout
import Layout from "./components/Layout/Layout";
import i18n from "./locales/i18n";
import ScrollToTop from "./components/utils/ScrollToTop";
import usePageTitle from "./hooks/usePageTitle";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
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
      <I18nextProvider i18n={i18n}>
        <Router>
          <Layout>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen ">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              }
            >
              <ScrollToTop />
              <Routes>
                <Route
                  path="/dashboard"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="courses">
                    <Route index element={<CourseList />} />
                    {/* <Route path="new" element={<CourseCreate />} />
                    <Route path=":id" element={<CourseDetail />} />
                    <Route path=":id/edit" element={<CourseEdit />} /> */}
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
      </I18nextProvider>
    </main>
  );
};

export default App;
