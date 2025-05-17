'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGraduationCap, FaBook, FaComments, FaTasks, FaChartBar } from 'react-icons/fa';
import { useEffect, useState } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: <FaGraduationCap className="w-5 h-5" /> },
    { name: 'Courses', href: '/courses', icon: <FaBook className="w-5 h-5" /> },
    { name: 'Assignments', href: '/assignments', icon: <FaTasks className="w-5 h-5" /> },
    { name: 'Discussions', href: '/discussions', icon: <FaComments className="w-5 h-5" /> },
    { name: 'Grades', href: '/grades', icon: <FaChartBar className="w-5 h-5" /> },
  ];

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" }).then(async (res) => {
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
    });
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-primary-dark font-bold text-xl flex items-center">
          <span className="text-accent-3 mr-2">NYU</span>
          <span>Brightspace</span>
        </div>
      </div>
      
      <div className="flex space-x-1 md:space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'text-primary bg-blue-50 dark:bg-gray-800' 
                  : 'text-gray-dark hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'}
              `}
            >
              <span className="mr-1.5">{item.icon}</span>
              <span className="hidden md:block">{item.name}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="flex items-center">
        <div className="relative">
          {user ? (
            <div className="h-10 w-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-semibold">
              {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : '?'}
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          )}
        </div>
      </div>

      {user ? (
        <>
          {user.role === "professor" ? (
            <Link
              href="/professor/dashboard"
              className="text-gray-dark hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md"
            >
              Professor Dashboard
            </Link>
          ) : (
            <Link
              href="/student/dashboard"
              className="text-gray-dark hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md"
            >
              Student Dashboard
            </Link>
          )}
          <Link
            href="#"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
              window.location.href = "/login";
            }}
            className="text-gray-dark hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md"
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="text-gray-dark hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-gray-dark hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md"
          >
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation; 