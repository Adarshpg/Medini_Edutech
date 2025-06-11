import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import {ChevronDown,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import logo from "@/assets/Logos/Medini_logo.png"
import autodeskLogo from "@/assets/NAVBAR/Autodesk ALP White.png"
import solidworksLogo from "@/assets/NAVBAR/Solidworks White.png"
import bentleyLogo from "@/assets/NAVBAR/Bentley White.png"
import sketchupLogo from "@/assets/NAVBAR/Sketch White.png"
import ThemeToggle from "./ThemeToggle"
import coursesData from '@/components/courses.json';

const Header = () => {
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showLinks, setShowLinks] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false);

  
  // get all Courses
  const courseCategories = [
    {
      name: "AutoDesk",
      categories: coursesData.courseProviders.find(p => p.id === "AUTODESK")?.categories || []
    },
    {
      name: "Bentley Systems",
      categories: coursesData.courseProviders.find(p => p.id === "BENTLEY")?.categories || []
    },
    {
      name: "Dassault",
      categories: coursesData.courseProviders.find(p => p.id === "DASSAULT")?.categories || []
    },
    {
      name: "Others",
      categories: coursesData.courseProviders.find(p => p.id === "OTHER")?.categories || []
    },
    {
      name: "Programming",
      categories: [{
        name: "Web & App Development",
        courses: [
          { id: "java-fullstack", name: "Java Fullstack" },
          { id: "python-fullstack", name: "Python Fullstack" },
          { id: "mern-stack", name: "MERN Stack" },
          { id: "cloud-application", name: "Cloud Application Development" }
        ]
      }]
    }
  ];

  useEffect(() => {
    const controlVisibility = () => {
      if (typeof window !== "undefined") {
        // Detect scroll direction
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setShowLinks(false)
        } else {
          // Scrolling up
          setShowLinks(true)
        }
        // Update last scroll position
        setLastScrollY(window.scrollY)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", controlVisibility)
    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", controlVisibility)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])


  const isCourse = location.pathname.includes("/courses/");
  
  // Function to determine which course provider logo to show based on the URL
  const getCourseProviderLogo = () => {
    const path = location.pathname.toLowerCase();
    
    // Autodesk courses
    if (path.includes('autocad') || path.includes('revit') || path.includes('fusion') || 
        path.includes('maya') || path.includes('3ds-max') || path.includes('civil-3d') || 
        path.includes('navisworks') || path.includes('infrawork')) {
      return autodeskLogo;
    }
    
    // SolidWorks courses
    if (path.includes('solidworks') || path.includes('solid-works')) {
      return solidworksLogo;
    }
    
    // Bentley courses
    if (path.includes('bentley') || path.includes('microstation') || 
        path.includes('openroads') || path.includes('openflows') || 
        path.includes('staad-pro')) {
      return bentleyLogo;
    }
    
    // SketchUp courses
    if (path.includes('sketchup') || path.includes('sketch-up')) {
      return sketchupLogo;
    }
    
    // Default to Autodesk logo if no specific match
    return autodeskLogo;
  };

  const phoneNumber = "919686311005";
  const handleClick = (e) => {
    e.preventDefault();
    // Create WhatsApp URL with the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col ">
      {/* Navbar */}
      <motion.nav
        className="bg-customBlue text-white"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex items-center justify-between p-4 px-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img
              src={logo}
              alt="Medini"
              className="h-14 mr-2"
            />
            
            {isCourse && (
              <>
                <div className="h-8 w-px bg-white mx-2"></div>
                <img
                  src={getCourseProviderLogo()}
                  alt="Course Provider"
                  className="h-8 ml-1"
                />
              </>
            )}

            
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <a
      href="#"
      className="relative overflow-hidden inline-flex h-10 items-center justify-center rounded-full bg-amber-100 px-6 py-2 text-sm font-medium text-amber-600 shadow-lg transition-all duration-500 hover:shadow-amber-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:shadow-lg dark:shadow-blue-700/30 group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="absolute -z-10 inset-0 rounded-full bg-amber-100 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></span>
      <span className="relative z-10 flex items-center">
        Get Started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </a>
              </div>
              
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
              <div
                  className={`absolute w-5 h-0.5 bg-current transition-all duration-500 ${isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
                ></div>
                <div
                  className={`absolute w-5 h-0.5 bg-current transition-all duration-500 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></div>
                <div
                  className={`absolute w-5 h-0.5 bg-current transition-all duration-500 ${isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
                ></div>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <ThemeToggle />
                <Button variant="outline" className="w-full">
                  <SheetTrigger asChild className="md:hidden">
                    <Link to="/">Home</Link>
                  </SheetTrigger>
                </Button>
                
                  <Button variant="outline" className="w-full flex items-center">
                  <SheetTrigger asChild className="md:hidden">
                    <Link to="/courses">Courses</Link>
                  </SheetTrigger>
                </Button>
                
                <Button variant="outline" className="w-full flex items-center">
                  <SheetTrigger asChild className="md:hidden">
                    <Link to="/about">About</Link>
                  </SheetTrigger>
                </Button>
                <Button variant="outline" className="w-full flex items-center">
                  <SheetTrigger asChild className="md:hidden">
                    <Link to="/blog">Blog</Link>
                  </SheetTrigger>
                </Button>
                {/* <Button variant="outline" className="w-full flex items-center">
                  <SheetTrigger asChild className="md:hidden">
                    <Link to="/awards">Awards</Link>
                  </SheetTrigger>
                </Button> */}
                <Button variant="outline" className="w-full flex items-center">
                  <SheetTrigger asChild className="md:hidden">
                    <Link to="/contact">Contact</Link>
                  </SheetTrigger>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>

      {/* Links */}
      <AnimatePresence>
        {showLinks && (
          <motion.div
            className="hidden bg-[#406d6e] text-white shadow-md md:flex"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
          >
            <div className="container mx-auto overflow-x-auto hide-scrollbar">

              {/* medini school navbar */}
            
                <div className="flex items-center gap-6 py-3 px-4 min-w-max">
                <div className="nav-item">
                  <Link to="/">Home</Link>
                </div>
                {/* Courses */}
                  <Popover>
                  <PopoverTrigger className="flex items-center font-semibold hover:text-amber-600 cursor-pointer group">
                    Courses
                    <ChevronDown className="ml-1 group-hover:rotate-180 transition-transform" size={16} />
                  </PopoverTrigger>
                  <PopoverContent className="w-[800px] p-0">
                    <div className="flex">
                      <ScrollArea className="w-1/3 p-4 border-r">
                        <h4 className="mb-4 text-sm font-medium">AutoDesk</h4>
                        {courseCategories[0].categories.flatMap(category => 
                          category.courses.map((course) => (
                            <Link to={`/courses/${course.id}`} key={course.id}>
                              <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                                {course.name}
                              </div>
                            </Link>
                          ))
                        )}
                      </ScrollArea>
                      
                      <ScrollArea className="w-1/3 p-4 border-r">
                        <h4 className="mb-4 text-sm font-medium">Bentley Systems</h4>
                        {courseCategories[1].categories.flatMap(category => 
                          category.courses.map((course) => (
                            <Link to={`/medinischoolofdesign/courses/${course.id}`} key={course.id}>
                              <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                                {course.name}
                              </div>
                            </Link>
                          ))
                        )}
                      </ScrollArea>
                      
                      <ScrollArea className="w-1/3 p-4 border-r">
                        <h4 className="mb-4 text-sm font-medium">Dassault</h4>
                        <Link to={`/medinischoolofdesign/courses/solidworks`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            SolidWorks
                          </div>
                        </Link>
                        <div className="text-sm py-2 font-medium text-gray-700 dark:text-gray-300 mt-3 mb-1">Trimble</div>
                        <Link to={`/medinischoolofdesign/courses/sketchup`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            SketchUp
                          </div>
                        </Link>
                        <div className="text-sm py-2 font-medium text-gray-700 dark:text-gray-300 mt-3 mb-1">Chaos</div>
                        <Link to={`/medinischoolofdesign/courses/vray`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            V-Ray
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/enscape`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Enscape
                          </div>
                        </Link>
                      </ScrollArea>
                      
                      <ScrollArea className="w-1/3 p-4 border-r">
                        <h4 className="mb-4 text-sm font-medium">Others</h4>
                        <Link to={`/medinischoolofdesign/courses/lumion`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Lumion
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/rhino`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Rhino
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/grasshopper`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Grasshopper
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/photoshop`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Photoshop
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/illustrator`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Illustrator
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/etabs`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            ETABS
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/ms-project`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            MS Project
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/qgis`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            QGIS
                          </div>
                        </Link>
                        <Link to={`/medinischoolofdesign/courses/adobe-animate`}>
                          <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                            Adobe Animate
                          </div>
                        </Link>
                      </ScrollArea>
                      
                      <ScrollArea className="w-1/3 p-4 border-r">
                        <h4 className="mb-4 text-sm font-medium">Programming</h4>
                        {courseCategories[4].categories.flatMap(category => 
                          category.courses.map((course) => (
                            <Link to={`/medinischoolofdesign/courses/${course.id}`} key={course.id}>
                              <div className="text-sm py-2 cursor-pointer hover:text-amber-600">
                                {course.name}
                              </div>
                            </Link>
                          ))
                        )}
                      </ScrollArea>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* <div className="nav-item">
                  <Link to="/awards">Awards</Link>
                </div> */}

                <div className="nav-item">
                  <Link to="/blog">Blog</Link>
                </div>

                <div className="nav-item">
                  <Link to="/about">About</Link>
                </div>
                <div className="nav-item">
                  <Link to="/contact">Contact</Link>
                </div>
                <div className="nav-item">
                  <Link to="/internship" className="font-semibold hover:text-amber-600">
                    Internship Courses
                  </Link>
                </div>
              </div>
              

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content below the header */}
      <div className={`h-${showLinks ? "28" : "16"} transition-all duration-300`}></div>
    </header>
  )
}

export default Header

