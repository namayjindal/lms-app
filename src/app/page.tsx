'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import CourseCard from './components/CourseCard';
import AnnouncementCard from './components/AnnouncementCard';
import AssignmentCard from './components/AssignmentCard';

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

interface Announcement {
  id: number;
  courseId: number;
  title: string;
  content: string;
  date: string;
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

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, announcementsRes, assignmentsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/courses'),
          axios.get('http://localhost:3001/api/announcements'),
          axios.get('http://localhost:3001/api/assignments')
        ]);

        setCourses(coursesRes.data);
        setAnnouncements(announcementsRes.data);
        setAssignments(assignmentsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          }
        ]);
        setAnnouncements([
          {
            id: 1,
            courseId: 1,
            title: 'Midterm Exam Date Change',
            content: 'The midterm exam has been rescheduled to October 27th. Please adjust your study plans accordingly.',
            date: '2023-10-15'
          },
          {
            id: 2,
            courseId: 2,
            title: 'Additional Office Hours',
            content: 'I will be holding additional office hours this Friday from 2-4 PM to help with the upcoming problem set.',
            date: '2023-10-18'
          }
        ]);
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
          }
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

  // Get upcoming assignments (due within next 7 days)
  const upcomingAssignments = assignments
    .filter(a => {
      const dueDate = new Date(a.dueDate);
      const today = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      return a.status !== 'Submitted' && dueDate > today && dueDate <= weekFromNow;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="gradient-text">Noah</span></h1>
          <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your courses today.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Courses</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map(course => (
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
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Announcements</h2>
                </div>
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <AnnouncementCard
                      key={announcement.id}
                      title={announcement.title}
                      content={announcement.content}
                      date={announcement.date}
                      courseName={getCourseNameById(announcement.courseId)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Upcoming</h2>
                </div>
                <div className="space-y-4">
                  {upcomingAssignments.map(assignment => (
                    <AssignmentCard
                      key={assignment.id}
                      id={assignment.id}
                      courseId={assignment.courseId}
                      title={assignment.title}
                      description={assignment.description}
                      dueDate={assignment.dueDate}
                      points={assignment.points}
                      status={assignment.status}
                      courseName={getCourseNameById(assignment.courseId)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
