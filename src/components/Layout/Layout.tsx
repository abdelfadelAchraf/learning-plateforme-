import React, { type ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import path from 'path';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow">
        {children}
      </main>
      {window.location.pathname !== '/dashboard' && <Footer />}
    </div>
  );
};

export default Layout;