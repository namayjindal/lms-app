'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import AssignmentCard from '../components/AssignmentCard';

interface Course {
  id: number;
  name: string;
}

interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: string;
  grade?: number;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past', 'submitted'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentsRes, coursesRes] = await Promise.all([
          axios.get('http://localhost:3001/api/assignments'),
          axios.get('http://localhost:3001/api/courses')
        ]);

        setAssignments(assignmentsRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Mock data
        setAssignments([
          {
            id: 1,
            courseId: 1,
            title: 'Programming Assignment 2',
            description: 'Implement a binary search tree with insertion, deletion, and traversal methods.',
            dueDate: '2023-11-02',
            points: 100,
            status: 'Not Submitted'
          },
          {
            id: 2,
            courseId: 1,
            title: 'Programming Assignment 1',
            description: 'Create a linked list implementation with various operations.',
            dueDate: '2023-10-15',
            points: 100,
            status: 'Submitted',
            grade: 92
          },
          {
            id: 3,
            courseId: 2,
            title: 'Problem Set 4',
            description: 'Solve problems related to multiple integrals and applications.',
            dueDate: '2023-10-30',
            points: 50,
            status: 'Not Submitted'
          },
          {
            id: 4,
            courseId: 3,
            title: 'Comparative Essay',
            description: 'Write a 5-page essay comparing Plato and Aristotle\'s views on ethics.',
            dueDate: '2023-11-05',
            points: 100,
            status: 'Not Submitted'
          },
          {
            id: 5,
            courseId: 3,
            title: 'Reading Response 2',
            description: 'Write a 2-page response to Nicomachean Ethics.',
            dueDate: '2023-10-18',
            points: 25,
            status: 'Submitted',
            grade: 24
          }
        ]);
        
        setCourses([
          { id: 1, name: 'Introduction to Computer Science' },
          { id: 2, name: 'Calculus III' },
          { id: 3, name: 'Texts & Ideas: Ancient Philosophy' },
          { id: 4, name: 'Introduction to Macroeconomics' },
          { id: 5, name: 'Cultural Anthropology' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCourseNameById = (courseId: number): string => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : '';
  };
  
  const filteredAssignments = assignments.filter(assignment => {
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    
    switch (filter) {
      case 'upcoming':
        return assignment.status !== 'Submitted' && dueDate >= today;
      case 'past':
        return assignment.status !== 'Submitted' && dueDate < today;
      case 'submitted':
        return assignment.status === 'Submitted';
      default:
        return true;
    }
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (a.status === 'Submitted' && b.status !== 'Submitted') return 1;
    if (a.status !== 'Submitted' && b.status === 'Submitted') return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Assignments</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your course assignments and deadlines</p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'upcoming' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'past' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            Past Due
          </button>
          <button 
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'submitted' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            Submitted
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedAssignments.length > 0 ? (
              sortedAssignments.map(assignment => (
                <AssignmentCard
                  key={assignment.id}
                  id={assignment.id}
                  courseId={assignment.courseId}
                  title={assignment.title}
                  description={assignment.description}
                  dueDate={assignment.dueDate}
                  points={assignment.points}
                  status={assignment.status}
                  grade={assignment.grade}
                  courseName={getCourseNameById(assignment.courseId)}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-lg text-gray-500 dark:text-gray-400">No assignments found for the selected filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 