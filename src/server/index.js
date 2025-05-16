const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for NYU Student
const courses = [
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
];

const announcements = [
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
  },
  {
    id: 3,
    courseId: 3,
    title: 'Essay Deadline Extended',
    content: 'The deadline for the comparative essay has been extended to November 5th.',
    date: '2023-10-20'
  }
];

const assignments = [
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
];

const discussions = [
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
  }
];

const grades = [
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
  },
  {
    courseId: 4,
    assignments: [
      { name: 'Economic Analysis Paper', grade: 88, maxPoints: 100 },
      { name: 'Quiz 1', grade: 78, maxPoints: 100 },
      { name: 'Quiz 2', grade: 92, maxPoints: 100 }
    ],
    currentGrade: 'B+'
  },
  {
    courseId: 5,
    assignments: [
      { name: 'Field Notes Assignment', grade: 47, maxPoints: 50 },
      { name: 'Cultural Analysis Paper', grade: 91, maxPoints: 100 }
    ],
    currentGrade: 'A-'
  }
];

// Routes
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

app.get('/api/announcements', (req, res) => {
  res.json(announcements);
});

app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});

app.get('/api/discussions', (req, res) => {
  res.json(discussions);
});

app.get('/api/grades', (req, res) => {
  res.json(grades);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 