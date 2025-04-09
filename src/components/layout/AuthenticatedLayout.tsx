
import React from 'react';
import Navbar from './Navbar';
import UserMenu from '../auth/UserMenu';
import Footer from './Footer';

// This wrapper provides authenticated header and footer
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="absolute top-4 right-6 z-50">
        <UserMenu />
      </div>
      <main className="flex-grow pt-16 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
