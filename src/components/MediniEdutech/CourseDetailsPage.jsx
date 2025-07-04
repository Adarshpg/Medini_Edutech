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
    <section className="py-20">
      <div className="container">
        <Button variant="outline" className="my-8 cursor-pointer" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Course Information */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{getIcon(course.id)}</span>
                  <span className="bg-secondary px-3 py-1 rounded text-sm">{course.category}</span>
                </div>
                <CardTitle className="text-3xl mb-2">{course.name || course.title}</CardTitle>
                <CardDescription className="text-lg">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <GraduationCap className="h-5 w-5 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Level</span>
                    <span className="font-medium">{course.difficulty}</span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <Users className="h-5 w-5 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Audience</span>
                    <span className="font-medium text-center text-sm">{course.targetAudience}</span>
                  </div>
                </div>

                {/* Curriculum Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Curriculum</h3>
                  {course.curriculum && course.curriculum.length > 0 ? (
                    <ul className="space-y-3">
                      {course.curriculum.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No curriculum information available.</p>
                  )}
                </div>

                {/* Learning Outcomes */}
                {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Provider</h4>
                  <span>{course.provider}</span>
                </div>

                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Prerequisites</h4>
                    <ul className="space-y-1">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
