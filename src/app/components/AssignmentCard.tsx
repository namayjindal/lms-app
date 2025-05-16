import Link from 'next/link';
import { FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

interface AssignmentCardProps {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: string;
  grade?: number;
  courseName?: string;
}

const AssignmentCard = ({ 
  id, 
  title, 
  description, 
  dueDate, 
  points, 
  status, 
  grade,
  courseName 
}: AssignmentCardProps) => {
  const isSubmitted = status === 'Submitted';
  const isPastDue = new Date(dueDate) < new Date() && !isSubmitted;
  
  // Format the date to be more readable
  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/assignments/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              {courseName && <p className="text-sm text-primary-dark mb-1">{courseName}</p>}
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                isSubmitted 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : isPastDue 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {isSubmitted ? 'Submitted' : isPastDue ? 'Past Due' : 'Due Soon'}
              </div>
              {isSubmitted && grade !== undefined && (
                <div className="mt-2 text-sm font-medium">
                  Grade: <span className="font-bold">{grade}/{points}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaCalendarAlt className="mr-2" />
              <span>Due: {formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaFileAlt className="mr-2" />
              <span>{points} points</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AssignmentCard; 