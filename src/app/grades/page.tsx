'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';

interface GradeItem {
  name: string;
  grade: number;
  maxPoints: number;
}

interface CourseGrade {
  courseId: number;
  assignments: GradeItem[];
  currentGrade: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
}

export default function GradesPage() {
  const [grades, setGrades] = useState<CourseGrade[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradesRes, coursesRes] = await Promise.all([
          axios.get('/api/grades'),
          axios.get('/api/courses')
        ]);

        setGrades(gradesRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Mock data
        setGrades([
          {
            courseId: 1,
            assignments: [
              { name: 'Programming Assignment 1', grade: 92, maxPoints: 100 },
              { name: 'Quiz 1', grade: 85, maxPoints: 100 },
              { name: 'Midterm Exam', grade: 88, maxPoints: 100 }
            ],
            currentGrade: 'A-'
          },
          {
            courseId: 2,
            assignments: [
              { name: 'Problem Set 1', grade: 95, maxPoints: 50 },
              { name: 'Problem Set 2', grade: 48, maxPoints: 50 },
              { name: 'Problem Set 3', grade: 46, maxPoints: 50 },
              { name: 'Midterm Exam', grade: 83, maxPoints: 100 }
            ],
            currentGrade: 'B+'
          },
          {
            courseId: 3,
            assignments: [
              { name: 'Reading Response 1', grade: 23, maxPoints: 25 },
              { name: 'Reading Response 2', grade: 24, maxPoints: 25 },
              { name: 'Class Participation', grade: 45, maxPoints: 50 }
            ],
            currentGrade: 'A'
          }
        ]);
        
        setCourses([
          { id: 1, name: 'Introduction to Computer Science', code: 'CSCI-UA 101' },
          { id: 2, name: 'Calculus III', code: 'MATH-UA 123' },
          { id: 3, name: 'Texts & Ideas: Ancient Philosophy', code: 'CORE-UA 400' },
          { id: 4, name: 'Introduction to Macroeconomics', code: 'ECON-UA 2' },
          { id: 5, name: 'Cultural Anthropology', code: 'ANTH-UA 101' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCourseById = (courseId: number) => {
    return courses.find(course => course.id === courseId);
  };

  // Calculate overall GPA
  const calculateOverallGPA = () => {
    const gradePoints: { [key: string]: number } = {
      'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    grades.forEach(grade => {
      const course = getCourseById(grade.courseId);
      if (course) {
        const credits = 4; // Assuming all courses are 4 credits
        totalPoints += gradePoints[grade.currentGrade] * credits;
        totalCredits += credits;
      }
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Grades</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your academic performance</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Term Summary</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Overall GPA</p>
                  <p className="text-3xl font-bold text-primary">{calculateOverallGPA()}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Courses</p>
                  <p className="text-3xl font-bold">{grades.length}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Term</p>
                  <p className="text-xl font-medium">Fall 2023</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Course Grades</h2>
            <div className="space-y-6">
              {grades.map((grade) => {
                const course = getCourseById(grade.courseId);
                if (!course) return null;
                
                // Calculate percentage
                const totalEarned = grade.assignments.reduce((sum, item) => sum + item.grade, 0);
                const totalPossible = grade.assignments.reduce((sum, item) => sum + item.maxPoints, 0);
                const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;
                
                return (
                  <div key={grade.courseId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{course.code}</p>
                          <h3 className="text-xl font-bold">{course.name}</h3>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-bold text-primary">{grade.currentGrade}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Assignments</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignment</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Out of</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Percentage</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {grade.assignments.map((assignment, index) => {
                                const assignmentPercentage = Math.round((assignment.grade / assignment.maxPoints) * 100);
                                
                                return (
                                  <tr key={index}>
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{assignment.name}</td>
                                    <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">{assignment.grade}</td>
                                    <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">{assignment.maxPoints}</td>
                                    <td className="px-4 py-3 text-sm text-right">
                                      <span 
                                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                          assignmentPercentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                          assignmentPercentage >= 80 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                          assignmentPercentage >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}
                                      >
                                        {assignmentPercentage}%
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
} 