import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, DollarSign, GraduationCap, Users, X } from "lucide-react"

// Import your courses data
import courseData from "../courses.json"

const courseIcons = {
  fusion: "",
  autocad: "",
  "autocad-electrical": "",
  "revit-architecture": "🏛️",
  "revit-mep": "",
  "revit-structure": "",
  "civil-3d": "🏗️",
  "3ds-max": "",
  maya: "",
  navisworks: "",
  infrawork: "",
  "openroads-designer": "",
  "openflows-watergems": "",
  "openflows-sewergems": "",
  "staad-pro": "",
  microstation: "",
  solidworks: "",
  sketchup: "",
  "V-Ray": "",
  lumion: "",
  enscape: "",
  primavera: "",
  rhino: "",
  grasshopper: "",
  photoshop: "",
  illustrator: "",
  etabs: "",
  "ms-project": "",
  qgis: "",
  "adobe-animate": "",
  "java-fullstack": "",
  "python-fullstack": "",
  "mern-stack": "",
  "cloud-app-dev": "",
  "fusion-360": "",
  "bim-infrastructure": "🏗️",
  "bim-construction": "🏗️",
  default: "",
}

const getIcon = (courseId) => {
  return courseIcons[courseId] || courseIcons.default
}

const specialMappings = {
  'fusion-360': 'fusion',
  'autocad-mechanical': 'autocad',
  '3ds-max': '3ds-max',
  'bim-construction': 'revit-architecture',
  'bim-infrastructure': 'civil-3d',
  'openroads-designer': 'openroads-designer',
  'openroads': 'openroads-designer',
  'open-roads': 'openroads-designer',
  'open roads': 'openroads-desider'
};

const findCourse = (courseName) => {
  try {
    if (!courseName) {
      console.error('No course name provided');
      return null;
    }
    
    // Clean up the course name
    const cleanCourseName = courseName.trim().toLowerCase();
    console.log('Cleaned course name:', cleanCourseName);
    
    // Check special mappings first
    if (specialMappings[cleanCourseName]) {
      const mappedId = specialMappings[cleanCourseName];
      console.log(`Special mapping found: ${cleanCourseName} -> ${mappedId}`);
    }
    
    // Get all courses from all providers and categories
    const allCourses = [];
    
    courseData.courseProviders.forEach(provider => {
      provider.categories?.forEach(category => {
        category.courses?.forEach(course => {
          allCourses.push({
            ...course, 
            provider: provider.id, 
            category: category.name,
            providerName: provider.name,
            categoryName: category.name
          });
        });
      });
    });
    
    console.log(`Searching for course: '${cleanCourseName}' among ${allCourses.length} courses`);
    
    // Try different matching strategies
    let found = null;
    
    // 1. Exact ID match
    found = allCourses.find(c => c.id.toLowerCase() === cleanCourseName);
    if (found) {
      console.log('Found by exact ID match');
      return found;
    }
    
    // 2. Special mapping
    if (specialMappings[cleanCourseName]) {
      const mappedId = specialMappings[cleanCourseName];
      found = allCourses.find(c => c.id === mappedId);
      if (found) {
        console.log(`Found by special mapping: ${cleanCourseName} -> ${mappedId}`);
        return found;
      }
    }
    
    // 3. Check if courseName is part of any ID or title
    found = allCourses.find(c => 
      c.id.toLowerCase().includes(cleanCourseName) ||
      (c.title && c.title.toLowerCase().includes(cleanCourseName)) ||
      (c.name && c.name.toLowerCase().includes(cleanCourseName))
    );
    
    if (found) {
      console.log('Found by partial match');
      return found;
    }
    
    // 4. Try without hyphens
    const noHyphenName = cleanCourseName.replace(/-/g, '');
    found = allCourses.find(c => 
      c.id.toLowerCase().replace(/-/g, '') === noHyphenName ||
      (c.title && c.title.toLowerCase().replace(/-/g, '').includes(noHyphenName)) ||
      (c.name && c.name.toLowerCase().replace(/-/g, '').includes(noHyphenName))
    );
    
    if (found) {
      console.log('Found by matching without hyphens');
      return found;
    }
  } catch (error) {
    console.error('Error finding course:', error);
  }
  
  // If we get here, no course was found
  console.log('No matching course found');
  try {
    console.log('Available course IDs:', courseData.courseProviders.flatMap(
      p => p.categories?.flatMap(
        c => c.courses?.map(cc => ({
          id: cc.id,
          name: cc.name || cc.title,
          provider: p.id,
          category: c.name
        }))
      ).filter(Boolean).flat()
    ));
  } catch (e) {
    console.error('Error logging available courses:', e);
  }
  
  return null;
}

export default function CourseDetailsPage() {
  const { courseName } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('CourseDetailsPage mounted with courseName:', courseName);
    const foundCourse = findCourse(courseName);
    console.log('Found course data:', foundCourse);
    
    if (foundCourse) {
      console.log('Setting course state with:', foundCourse);
      setCourse(foundCourse);
    } else {
      console.error('No course found for:', courseName);
      // Try to find what courses are available
      try {
        const allCourses = [];
        courseData.courseProviders.forEach(provider => {
          provider.categories?.forEach(category => {
            category.courses?.forEach(course => {
              allCourses.push({
                id: course.id,
                name: course.name,
                provider: provider.id,
                category: category.name
              });
            });
          });
        });
        console.log('All available courses:', allCourses);
      } catch (error) {
        console.error('Error getting course list:', error);
      }
    }
    setLoading(false);
  }, [courseName]);

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="container py-20 flex justify-center">
        <p>Loading course details...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Course Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="p-6 md:p-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {course.category}
                    </span>
                    <span className="text-4xl">{getIcon(course.id)}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {course.name || course.title}
                  </h1>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {course.description}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="font-medium text-gray-900 dark:text-white">{course.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/30">
                        <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Audience</p>
                        <p className="font-medium text-gray-900 dark:text-white">{course.targetAudience}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Curriculum Section */}
            {course.curriculum && course.curriculum.length > 0 && (
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Course Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {course.curriculum.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Learning Outcomes */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Image */}
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              {(() => {
                // Map course categories to their respective images
                const categoryImages = {
                  // BIM Categories
                  'bim': '/IMAGES/BIM_for_ Architecture.jpg',
                  'bim architecture': '/IMAGES/BIM_for_ Architecture.jpg',
                  'bim construction': '/IMAGES/BIM_for_Construction.png',
                  'bim infrastructure': '/IMAGES/BIM_for_Infrastructure.png',
                  'structural bim': '/IMAGES/Revit Architecture.jpg',
                  'revit': '/IMAGES/Revit Architecture.jpg',
                  
                  // Design & Drafting
                  'autocad': '/IMAGES/AutoCAD.jpg',
                  'fusion': '/IMAGES/Product Design and Manufacturing.png',
                  'inventor': '/IMAGES/Product Design and Manufacturing.png',
                  '3ds max': '/IMAGES/3ds-max.jpg',
                  'maya': '/IMAGES/3ds-max.jpg',
                  'product design': '/IMAGES/Product Design and Manufacturing.png',
                  
                  // IT & Development
                  'it': '/IMAGES/IT.png',
                  'software': '/IMAGES/IT.png',
                  'programming': '/IMAGES/IT.png',
                  'cloud': '/IMAGES/cloud.jpg',
                  'aws': '/IMAGES/cloud.jpg',
                  'azure': '/IMAGES/cloud.jpg',
                  
                  // Default image - Using a professional education/technology image
                  'default': '/IMAGES/techvritti-1.jpg'
                };

                // Find the best matching image for the current course
                const getImageForCourse = () => {
                  if (!course) return categoryImages['default'];
                  
                  const lowerCategory = String(course.category || '').toLowerCase();
                  const lowerName = String(course.name || '').toLowerCase();
                  
                  // Check for exact matches first
                  if (categoryImages[lowerCategory]) {
                    return categoryImages[lowerCategory];
                  }
                  
                  // Check for partial matches in category
                  for (const [key, value] of Object.entries(categoryImages)) {
                    if (lowerCategory.includes(key)) {
                      return value;
                    }
                  }
                  
                  // Check for matches in course name
                  for (const [key, value] of Object.entries(categoryImages)) {
                    if (lowerName.includes(key)) {
                      return value;
                    }
                  }
                  
                  return categoryImages['default'];
                };

                const imageSrc = getImageForCourse();
                
                return (
                  <img 
                    src={imageSrc}
                    alt={`${course?.category || course?.name || 'Course'} Image`}
                    className="w-full h-auto max-h-80 object-cover"
                    onError={(e) => {
                      e.target.src = categoryImages['default'];
                    }}
                  />
                );
              })()}
            </div>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Information</h3>
                
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Prerequisites</h4>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className="w-full py-6 text-base font-medium"
                  onClick={() => window.open('https://register.medinitechnologies.in/', '_blank')}
                >
                  Enroll Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
