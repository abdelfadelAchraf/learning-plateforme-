import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

// Layout
import Layout from "./components/Layout/Layout";
import i18n from "./locales/i18n";
import ScrollToTop from "./components/utils/ScrollToTop";
import usePageTitle from "./hooks/usePageTitle";
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
