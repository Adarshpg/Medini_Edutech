import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { ChevronDown, ChevronRight } from "lucide-react"
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
  const [isHovered, setIsHovered] = useState(false)
  const [mainPopoverOpen, setMainPopoverOpen] = useState(false)
  const [openPopovers, setOpenPopovers] = useState({})

  const handleCourseClick = (providerId) => {
    // Close both the main popover and the provider's submenu
    setMainPopoverOpen(false)
    setOpenPopovers(prev => ({
      ...prev,
      [providerId]: false
    }))
  }

  // Map all course providers to the menu structure
  const courseCategories = [
    {
      id: "AUTODESK",
      name: "AutoDesk",
      categories: coursesData.courseProviders.find(p => p.id === "AUTODESK")?.categories || []
    },
    {
      id: "BENTLEY",
      name: "Bentley Systems",
      categories: coursesData.courseProviders.find(p => p.id === "BENTLEY")?.categories || []
    },
    {
      id: "DASSAULT",
      name: "Dassault",
      categories: coursesData.courseProviders.find(p => p.id === "DASSAULT")?.categories || []
    },
    {
      id: "BIM_CONSTRUCTION",
      name: "BIM",
      categories: coursesData.courseProviders.find(p => p.id === "BIM_CONSTRUCTION")?.categories || []
    },
    {
      id: "OTHER",
      name: "Others",
      categories: coursesData.courseProviders.find(p => p.id === "OTHER")?.categories || []
    },
    {
      id: "IT",
      name: "Programming & IT",
      categories: coursesData.courseProviders.find(p => p.id === "IT")?.categories || []
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

  // Add CSS to prevent horizontal scrolling
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-screen overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        className="bg-customBlue text-white w-full"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full px-4">
          <div className="w-full flex items-center justify-between py-4">
            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <img
                src={logo}
                alt="Medini"
                className="h-12 md:h-14"
              />  
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center gap-4">
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

            {/* Mobile Navigation Button */}
            <div className="md:hidden z-50 fixed right-4 top-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative w-12 h-12 p-0 m-0 hover:bg-white/20 focus:ring-2 focus:ring-white/30 z-50"
                    aria-label="Toggle menu"
                  >
                    <div className="relative w-8 h-6 flex flex-col justify-between items-center">
                      <span 
                        className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
                      ></span>
                      <span 
                        className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                      ></span>
                      <span 
                        className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                      ></span>
                    </div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-3">
                    <div className="px-4 py-2">
                      <ThemeToggle />
                    </div>
                    {[
                      { to: "/mediniedutech/", label: "Home" },
                      { 
                        label: "Courses",
                        onClick: () => {
                          setIsMobileMenuOpen(false);
                          if (window.location.pathname === '/mediniedutech/') {
                            const coursesSection = document.getElementById('explore-courses');
                            if (coursesSection) {
                              coursesSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            window.location.href = '/mediniedutech/#explore-courses';
                          }
                        }
                      },
                      { to: "/mediniedutech/about", label: "About" },
                      { to: "/mediniedutech/contact", label: "Contact" },
                      { to: "/mediniedutech/internship", label: "Internship" }
                    ].map((item, index) => (
                      item.to ? (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 text-lg font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={`btn-${index}`}
                          onClick={item.onClick}
                          className="w-full text-left px-4 py-3 text-lg font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Links Section */}
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
              damping: 30
            }}
          >
            <div className="container mx-auto overflow-x-auto hide-scrollbar">
              <div className="flex items-center gap-6 py-3 px-4 min-w-max">
                <div className="nav-item">
                  <Link to="/mediniedutech/">Home</Link>
                </div>
                {/* Courses */}
                <Popover open={mainPopoverOpen} onOpenChange={setMainPopoverOpen}>
                  <PopoverTrigger className="flex items-center font-semibold hover:text-amber-600 cursor-pointer group">
                    Courses
                    <ChevronDown className={`ml-1 transition-transform ${mainPopoverOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} size={16} />
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" sideOffset={5}>
                    <div className="py-1">
                      {courseCategories.map((provider, index) => (
                        <Popover 
                          key={provider.id}
                          open={openPopovers[provider.id]}
                          onOpenChange={(open) => setOpenPopovers(prev => ({
                            ...prev,
                            [provider.id]: open
                          }))}
                        >
                          <PopoverTrigger asChild>
                            <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                              <span>{provider.name}</span>
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-0 ml-1" side="right" align="start">
                            <div className="py-2 max-h-[60vh] overflow-y-auto">
                              {provider.categories.flatMap(category => category.courses).map((course) => (
                                <Link 
                                  to={`/mediniedutech/courses/${course.id}`} 
                                  key={course.id}
                                  className="block px-4 py-2 text-sm hover:bg-amber-50 dark:hover:bg-gray-700 hover:text-amber-600 dark:hover:text-white"
                                  onClick={() => handleCourseClick(provider.id)}
                                >
                                  {course.name}
                                </Link>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <div className="nav-item">
                  <Link to="/mediniedutech/internship">Internship</Link>  
                </div>

                <div className="nav-item">
                  <Link to="/mediniedutech/about">About</Link>
                </div>
                <div className="nav-item">
                  <Link to="/mediniedutech/contact">Contact</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content below the header */}
      <div className={`h-${showLinks ? "28" : "16"} transition-all duration-300`}></div>
    </div>
  )
}

export default Header