import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, DollarSign, GraduationCap, Users } from "lucide-react"

// Import your courses data
import courseData from "../courses.json"

export default function CourseDetailsPage() {
  const { courseName } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    
    // Create a mapping for special cases
    const specialMappings = {
      'fusion-360': 'fusion',
      'autocad-mechanical': 'autocad',
      '3ds-max': '3ds-max'
    };
    
    // Find the course by ID
    const findCourse = () => {
      try {
        // Get all courses from all providers and categories
        const allCourses = [];
        
        courseData.courseProviders.forEach(provider => {
          provider.categories.forEach(category => {
            category.courses.forEach(course => {
              allCourses.push({...course, provider: provider.id, category: category.name});
            });
          });
        });
        
        // Check for special mappings first
        let found = null;
        if (specialMappings[courseName]) {
          const mappedId = specialMappings[courseName];
          console.log(`Special mapping found: ${courseName} -> ${mappedId}`);
          found = allCourses.find(c => c.id === mappedId);
        }
        
        // If no special mapping or not found with mapping, try exact match
        if (!found) {
          found = allCourses.find(c => c.id === courseName);
        }
        
        // If still not found, try different matching strategies
        if (!found) {
          
          // Try without hyphens
          const simplifiedId = courseName.replace(/-/g, '');
          found = allCourses.find(c => c.id.replace(/-/g, '') === simplifiedId);
          
          // Try partial match
          if (!found) {
            found = allCourses.find(c => 
              courseName.includes(c.id) || c.id.includes(courseName)
            );
          }
          
          // If still not found, use the first course (for testing)
          if (!found && allCourses.length > 0) {
            found = allCourses[0];
          }
        }
        
        if (found) {
          setCourse(found);
          
          // Find the provider for this course
          const provider = courseData.courseProviders.find(p => 
            p.categories.some(cat => 
              cat.courses.some(c => c.id === found.id)
            )
          );
          
          
        } else {
          console.error('No courses found at all');
        }
      } catch (error) {
        console.error('Error finding course:', error);
      } finally {
        setLoading(false);
      }
    };
    
    findCourse();
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

  // Icon mapping for course types
  const courseIcons = {
    fusion: "",
    autocad: "",
    "autocad-electrical": "",
    "revit-architecture": "",
    "revit-mep": "",
    "revit-structure": "",
    "civil-3d": "",
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
    "bim-infrastructure": "",
    "bim-construction": "",
    default: "",
  }

  const getIcon = (courseId) => {
    return courseIcons[courseId] || courseIcons.default
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
                <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
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
