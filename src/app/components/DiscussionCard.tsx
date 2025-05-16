import Link from 'next/link';
import { FaComments, FaUserCircle } from 'react-icons/fa';

interface Reply {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface DiscussionCardProps {
  id: number;
  courseId: number;
  title: string;
  content: string;
  author: string;
  date: string;
  replies: Reply[];
  courseName?: string;
}

const DiscussionCard = ({ 
  id, 
  courseId, 
  title, 
  content, 
  author, 
  date, 
  replies,
  courseName 
}: DiscussionCardProps) => {
  // Format the date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/discussions/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="mb-4">
            {courseName && <p className="text-sm text-primary-dark mb-1">{courseName}</p>}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{content}</p>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center">
              <FaUserCircle className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium">{author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaComments className="mr-2" />
              <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionCard; 