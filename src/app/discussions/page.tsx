'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import DiscussionCard from '../components/DiscussionCard';

interface Course {
  id: number;
  name: string;
}

interface Reply {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface Discussion {
  id: number;
  courseId: number;
  title: string;
  content: string;
  author: string;
  date: string;
  replies: Reply[];
}

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | null>(null); // null means all courses

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discussionsRes, coursesRes] = await Promise.all([
          axios.get('/api/discussions'),
          axios.get('/api/courses')
        ]);

        setDiscussions(discussionsRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Mock data
        setDiscussions([
          {
            id: 1,
            courseId: 1,
            title: 'Algorithm Efficiency Questions',
            content: 'I\'m struggling to understand the time complexity analysis for the quick sort algorithm. Can anyone help explain?',
            author: 'Alex Thompson',
            date: '2023-10-14',
            replies: [
              {
                id: 101,
                author: 'Jamie Rodriguez',
                content: 'The average time complexity is O(n log n), but worst case is O(n²) when the pivot selection is poor.',
                date: '2023-10-14'
              },
              {
                id: 102,
                author: 'Prof. Emily Chen',
                content: 'Great explanation Jamie. We\'ll review this more in Wednesday\'s lecture.',
                date: '2023-10-15'
              }
            ]
          },
          {
            id: 2,
            courseId: 3,
            title: 'Socratic Method Discussion',
            content: 'What do you all think about the effectiveness of the Socratic method as a teaching tool?',
            author: 'Taylor Kim',
            date: '2023-10-17',
            replies: [
              {
                id: 201,
                author: 'Jordan Smith',
                content: 'I find it really engaging! It forces you to think critically rather than just memorize information.',
                date: '2023-10-17'
              }
            ]
          },
          {
            id: 3,
            courseId: 2,
            title: 'Question about Double Integrals',
            content: 'Can someone explain how to set up the limits of integration for this problem? I\'m not sure how to approach it.',
            author: 'Noah Singh',
            date: '2023-10-19',
            replies: []
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
  
  const filteredDiscussions = filter 
    ? discussions.filter(discussion => discussion.courseId === filter)
    : discussions;

  // Sort discussions by most recent
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Discussions</h1>
          <p className="text-gray-600 dark:text-gray-300">Engage with your classmates and instructors</p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === null 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            All Courses
          </button>
          {courses.map(course => (
            <button 
              key={course.id}
              onClick={() => setFilter(course.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === course.id
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedDiscussions.length > 0 ? (
              sortedDiscussions.map(discussion => (
                <DiscussionCard
                  key={discussion.id}
                  id={discussion.id}
                  courseId={discussion.courseId}
                  title={discussion.title}
                  content={discussion.content}
                  author={discussion.author}
                  date={discussion.date}
                  replies={discussion.replies}
                  courseName={getCourseNameById(discussion.courseId)}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-lg text-gray-500 dark:text-gray-400">No discussions found for the selected course.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 