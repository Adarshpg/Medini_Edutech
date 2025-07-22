import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react";

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Destructure with fallback values
  const {
    title = "Course Title",
    duration = "8 Weeks",
    difficulty = "Intermediate",
    coverImage = "/images/placeholder.jpg",
    id = ""
  } = course || {};

  const mainColor = "rgb(25,65,75)";

  // Handle image loading errors
  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src);
    setImageError(true);
  };

  return (
    <div 
      className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image with Subtle Zoom */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageError ? '/images/placeholder.jpg' : coverImage} 
          alt={title}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Difficulty Badge */}
        <div 
          className="absolute top-3 right-3 px-2 py-1 text-white text-xs font-medium rounded"
          style={{ backgroundColor: mainColor }}
        >
          {difficulty}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold dark:text-white mb-2 line-clamp-2 h-14">
          {title}
        </h3>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-3"></div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" style={{ color: mainColor }} />
            <span>12 Modules</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" style={{ color: mainColor }} />
            <span>{duration}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/courses/${id}`}
          className="mt-auto inline-flex items-center text-sm font-medium"
          style={{ color: mainColor }}
        >
          Learn More
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;