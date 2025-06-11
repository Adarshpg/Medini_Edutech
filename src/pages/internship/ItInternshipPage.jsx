import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Laptop, Award } from 'lucide-react';

const ItInternshipPage = () => {
  const courses = [
    {
      id: 'ai-ml',
      title: 'AI & ML',
      duration: '4 Months',
      students: '45+ Students Enrolled',
      description: 'Master Artificial Intelligence and Machine Learning with Python, TensorFlow, and real-world projects.',
      highlights: [
        'Deep Learning with TensorFlow & Keras',
        'Neural Networks & Computer Vision',
        'Natural Language Processing (NLP)',
        'Real-world AI projects'
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science',
      duration: '3 Months',
      students: '50+ Students Enrolled',
      description: 'Become a Data Scientist with Python, SQL, and Data Visualization tools.',
      highlights: [
        'Data Analysis with Python & Pandas',
        'SQL for Data Science',
        'Data Visualization with Matplotlib & Seaborn',
        'Machine Learning basics'
      ]
    },
    {
      id: 'java-fullstack',
      title: 'Java Fullstack',
      duration: '4 Months',
      students: '40+ Students Enrolled',
      description: 'Become a full-stack developer with Java, Spring Boot, and React.',
      highlights: [
        'Core Java & Advanced Java',
        'Spring Boot & Spring Security',
        'React.js for frontend',
        'RESTful APIs & Microservices'
      ]
    },
    {
      id: 'python-fullstack',
      title: 'Python Fullstack',
      duration: '3.5 Months',
      students: '55+ Students Enrolled',
      description: 'Master full-stack development with Python, Django, and React.',
      highlights: [
        'Python & Django Framework',
        'Django REST Framework',
        'Frontend with React.js',
        'Database Management with PostgreSQL'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              IT Internship Programs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Launch your tech career with hands-on experience and industry-relevant skills
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {course.title}
                    </h2>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium px-3 py-1 rounded-full">
                      {course.duration}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {course.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students}</span>
                    </div>
                    <Link
                      to={`/internship/it/${course.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Learn More
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our IT Internship Program?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                  <Laptop className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hands-on Projects</h3>
                <p className="text-gray-600 dark:text-gray-300">Work on real-world projects to build your portfolio</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mentorship</h3>
                <p className="text-gray-600 dark:text-gray-300">Guidance from industry experts and professionals</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Certification</h3>
                <p className="text-gray-600 dark:text-gray-300">Earn a recognized certificate upon completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItInternshipPage;
