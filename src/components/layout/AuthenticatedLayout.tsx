
import React from 'react';
import Navbar from './Navbar';
import UserMenu from '../auth/UserMenu';

// This wrapper provides only the authenticated header without duplicating the footer
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="absolute top-4 right-6 z-50">
        <UserMenu />
      </div>
      <main className="flex-grow pt-16">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
