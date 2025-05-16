import { FaBullhorn } from 'react-icons/fa';

interface AnnouncementCardProps {
  title: string;
  content: string;
  date: string;
  courseName?: string;
}

const AnnouncementCard = ({ title, content, date, courseName }: AnnouncementCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-accent rounded-full p-2 mr-3">
            <FaBullhorn className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            {courseName && <p className="text-sm text-primary-dark">{courseName}</p>}
          </div>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  );
};

export default AnnouncementCard; 