
import React from 'react';
import Layout from './Layout';
import UserMenu from '../auth/UserMenu';

// This wrapper would be used in your application once you can modify the Layout component directly
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <div className="absolute top-4 right-6 z-50">
        <UserMenu />
      </div>
      {children}
    </Layout>
  );
};

export default AuthenticatedLayout;
