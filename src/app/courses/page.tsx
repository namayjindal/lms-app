'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import CourseCard from '../components/CourseCard';

interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  location: string;
  color: string;
  credits: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // For demo purposes, provide mock data if the server is not running
        setCourses([
          {
            id: 1,
            code: 'CSCI-UA 101',
            name: 'Introduction to Computer Science',
            instructor: 'Dr. Emily Chen',
            schedule: 'Mon/Wed 10:00 AM - 11:50 AM',
            location: 'Warren Weaver Hall, Room 109',
            credits: 4,
            color: 'purple'
          },
          {
            id: 2,
            code: 'MATH-UA 123',
            name: 'Calculus III',
            instructor: 'Prof. David Rodriguez',
            schedule: 'Tue/Thu 1:00 PM - 2:50 PM',
            location: 'Courant Institute, Room 201',
            credits: 4,
            color: 'blue'
          },
          {
            id: 3,
            code: 'CORE-UA 400',
            name: 'Texts & Ideas: Ancient Philosophy',
            instructor: 'Dr. Sarah Johnson',
            schedule: 'Wed/Fri 3:00 PM - 4:50 PM',
            location: 'Silver Center, Room 405',
            credits: 4,
            color: 'green'
          },
          {
            id: 4,
            code: 'ECON-UA 2',
            name: 'Introduction to Macroeconomics',
            instructor: 'Prof. Michael Chang',
            schedule: 'Mon/Wed 2:00 PM - 3:50 PM',
            location: 'Waverly Building, Room 566',
            credits: 4,
            color: 'orange'
          },
          {
            id: 5,
            code: 'ANTH-UA 101',
            name: 'Cultural Anthropology',
            instructor: 'Dr. Elena Martinez',
            schedule: 'Tue/Thu 10:00 AM - 11:50 AM',
            location: 'Waverly Building, Room 268',
            credits: 4,
            color: 'pink'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Your Courses</h1>
          <p className="text-gray-600 dark:text-gray-300">Fall 2023 - NYU College of Arts & Science</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                id={course.id}
                code={course.code}
                name={course.name}
                instructor={course.instructor}
                schedule={course.schedule}
                location={course.location}
                color={course.color}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 