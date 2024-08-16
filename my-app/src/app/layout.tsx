"use client";

import { useEffect, useState } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop < lastScrollTop) {
        setShowHeader(true); // Scrolling up
      } else {
        setShowHeader(false); // Scrolling down
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>My Stock App</title>
      </head>
      <body className="bg-gray-100 font-sans flex flex-col min-h-screen">
        <header className={`bg-blue-600 text-white shadow-md fixed top-0 w-full z-10 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
          <nav className="container mx-auto flex justify-between items-center p-4">
            <div className="text-xl font-bold">
              <a href="/" className="hover:text-gray-200 transition-colors">My Stock App</a>
            </div>
            <ul className="flex space-x-6 bg-blue-600 rounded-md py-1 px-2">
              <li>
                <a href="/" className="hover:bg-blue-500 px-4 py-2 rounded transition-colors text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/next-page" className="hover:bg-blue-500 px-4 py-2 rounded transition-colors text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/report-generation" className="hover:bg-blue-500 px-4 py-2 rounded transition-colors text-white">
                  Report Generation
                </a>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <div>
                {!isAuthenticated ? (
                  <>
                    <a href="/login" className="mr-4 hover:text-gray-200 transition-colors">Login</a>
                    <a href="/register" className="hover:text-gray-200 transition-colors">Register</a>
                  </>
                ) : (
                  <a href="/logout" className="hover:text-gray-200 transition-colors">Logout</a>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-6 mt-16">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 My Stock App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

