'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGraduationCap, FaBook, FaComments, FaTasks, FaChartBar } from 'react-icons/fa';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: <FaGraduationCap className="w-5 h-5" /> },
    { name: 'Courses', href: '/courses', icon: <FaBook className="w-5 h-5" /> },
    { name: 'Assignments', href: '/assignments', icon: <FaTasks className="w-5 h-5" /> },
    { name: 'Discussions', href: '/discussions', icon: <FaComments className="w-5 h-5" /> },
    { name: 'Grades', href: '/grades', icon: <FaChartBar className="w-5 h-5" /> },
  ];

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
          <div className="h-10 w-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-semibold">
            NS
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 