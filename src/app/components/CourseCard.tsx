import Link from 'next/link';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface CourseCardProps {
  id: number;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  location: string;
  color: string;
}

const CourseCard = ({ id, code, name, instructor, schedule, location, color }: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className={`course-card card-${color} bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-xl`}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{code}</p>
              <h3 className="text-xl font-bold mb-2">{name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{instructor}</p>
            </div>
            <div className={`h-3 w-3 rounded-full dot-${color}`}></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaClock className="mr-2" />
              <span>{schedule}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaMapMarkerAlt className="mr-2" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard; 