import React, { type ReactNode } from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
const hideHeader = location.pathname.startsWith("/dashboard");
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    {!hideHeader && <Header />}
      <main className="grow">
        {children}
      </main>
      {window.location.pathname !== '/dashboard' && <Footer />}
    </div>
  );
};

export default Layout;