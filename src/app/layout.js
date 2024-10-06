import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Web3Provider } from '@/context/Web3Context';

const Layout = ({ children }) => {
  return (
    <Web3Provider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </Web3Provider>
  );
};

export default Layout;