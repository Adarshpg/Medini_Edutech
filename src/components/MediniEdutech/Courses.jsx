"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// Import your courses data
import coursesData from "../courses.json"

// Icon mapping for different course types
const courseIcons = {
  // Design & Drafting
  fusion: "",
  autocad: "",
  "autocad-electrical": "",

  // BIM
  "revit-architecture": "",
  "revit-mep": "",
  "revit-structure": "",

  // Civil Infrastructure
  "civil-3d": "",

  // Visualization
  "3ds-max": "",
  maya: "",

  // Project Coordination
  navisworks: "",

  // Infrastructure
  infrawork: "",

  // Bentley
  "openroads-designer": "",
  "openflows-watergems": "",
  "openflows-sewergems": "",
  "staad-pro": "",
  microstation: "",

  // Dassault
  solidworks: "",

  // Other
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

  // IT Courses
  "java-fullstack": "",
  "python-fullstack": "",
  "mern-stack": "",
  "cloud-app-dev": "",

  // Product Design
  "fusion-360": "",

  // BIM Management
  "bim-infrastructure": "",
  "bim-construction": "",

  default: "",
}

export function Courses() {
  // Flatten all courses from all providers and categories
  const allCourses = coursesData.courseProviders.flatMap((provider) =>
    provider.categories.flatMap((category) =>
      category.courses.map((course) => ({
        ...course,
        provider: provider.id,
        category: category.name,
        providerLogo: provider.logo,
        uniqueId: `${provider.id}-${course.id}`, // Create a unique ID for each course
      })),
    ),
  )

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 6

  // Calculate pagination values
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(allCourses.length / coursesPerPage)

  // Handle page changes
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0) // Scroll to top when changing pages
  }

  const getIcon = (courseId) => {
    return <span className="text-2xl">{courseIcons[courseId] || courseIcons.default}</span>
  }

  // Handle view details click
  const handleViewDetails = (courseId) => {
    // Navigate to course details page
    window.location.href = `/courses/${courseId}`
  }

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="flex justify-center text-4xl p-12 font-bold font-mono text-customBlue">ALL COURSES</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
            <Card
              key={course.uniqueId}
              className="bg-card border shadow-sm h-full flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2 flex-grow">
                <div className="mb-4 flex items-center justify-between">
                  {getIcon(course.id)}
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">{course.difficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-primary">₹{course.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Instructor:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                </div>

                {course.curriculum && course.curriculum.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">What you'll learn:</h4>
                    <ul className="space-y-1">
                      {course.curriculum.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="h-3 w-3 text-primary mt-1 flex-shrink-0"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-xs line-clamp-2">{item}</span>
                        </li>
                      ))}
                      {course.curriculum.length > 3 && (
                        <li className="text-xs text-muted-foreground pl-5">
                          +{course.curriculum.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    <span className="bg-accent px-2 py-1 rounded text-xs">{course.targetAudience}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => handleViewDetails(course.uniqueId)}
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>

          <p className="text-muted-foreground">
            Showing {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, allCourses.length)} of {allCourses.length}{" "}
            courses
          </p>
        </div>
      </div>
    </section>
  )
}
