import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react";
const images = import.meta.glob("/src/assets/IMAGES/*.jpg", { eager: true });

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Destructure with fallback values
  const {
    title = "Advanced Design Masterclass",
    instructor = "Elena Rodriguez",
    duration = "8 Weeks",
    difficulty = "Advanced",
    coverImage = "/placeholder.svg?height=200&width=300",
    id = ""
  } = course || {};

  const courseImage = images[`/src/assets/IMAGES/${coverImage}`]?.default || "/placeholder.svg";

  const mainColor = "rgb(25,65,75)";

  return (
    <div 
      className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image with Subtle Zoom */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={courseImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
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
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold dark:text-white mb-2">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          by <span className="font-medium">{instructor}</span>
        </p>
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-3"></div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" style={{ color: mainColor }} />
            <span>12 Modules</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link to={`/courses/${id}`} className="block">
          <button 
            className="w-full flex items-center justify-center py-2.5 rounded text-white text-sm font-medium transition-colors duration-300 hover:opacity-90"
            style={{ backgroundColor: mainColor }}
          >
            View Course Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;