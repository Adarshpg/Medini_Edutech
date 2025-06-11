import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import bg_image from "@/assets/IMAGES/getty-images-OB7KJ7WtHOs-unsplash.jpg"
import autocad from "@/assets/IMAGES/AutoCAD.jpg"
import civil3d from "@/assets/IMAGES/tool-inc-AkpJnHXu6Hg-unsplash.jpg"
import solidworks from "@/assets/IMAGES/osman-talha-dikyar-PomM7aa5m18-unsplash.jpg"
import microstation from "@/assets/IMAGES/getty-images-ItieuN1ec0k-unsplash.jpg"
import itImage from "@/assets/IMAGES/thisisengineering-AvGIBmvdcac-unsplash.jpg"
import infraworks from "@/assets/IMAGES/getty-images-KD_fT_T4D24-unsplash.jpg"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import FeedbackSection from "./FeedbackSection"

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [showITPopup, setShowITPopup] = useState(false)
  const [showAECPopup, setShowAECPopup] = useState(false)
  const [showProductDesignPopup, setShowProductDesignPopup] = useState(false)
  const sliderRef = useRef(null)
  const heroRef = useRef(null)

  const cards = [
    {
      id: 1,
      image: `${autocad}?height=200&width=300`,
      name: "BIM for Construction",
      description: "Master 2D and 3D design fundamentals",
      // link: "/courses/autocad",
    },
    {
      id: 2,
      image: `${civil3d}?height=200&width=300`,
      name: "BIM for Infrastructure",
      description: "Advanced civil engineering modeling",
      // link: "/courses/civil3d",
    },
    {
      id: 3,
      image: `${solidworks}?height=200&width=300`,
      name: "BIM for Architecture",
      description: "Professional 3D CAD design",
      // link: "/courses/solidworks",
    },
    {
      id: 4,
      image: `${microstation}?height=200&width=300`,
      name: "Product Design and Manufacturing",
      description: "Infrastructure design solutions",
      // link: "/courses/microstation",
    },
    {
      id: 5,
      image: `${infraworks}?height=200&width=300`,
      name: "AEC",
      description: "Architecture, Engineering & Construction design solutions",
      // link: "/courses/aec",
    },
    {
      id: 6,
      image: `${itImage}?height=200&width=300`,
      name: 'IT',
      description: "Software development courses including Java, Python, MERN Stack, and Cloud technologies"
    }
  ]
  
  // Calculate header height on mount and window resize
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    // Initial calculation
    calculateHeaderHeight()

    // Recalculate on resize
    window.addEventListener("resize", calculateHeaderHeight)

    return () => {
      window.removeEventListener("resize", calculateHeaderHeight)
    }
  }, [])

  const slideLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      // Loop back to the end
      setCurrentIndex(cards.length - 4)
    }
  }

  const slideRight = () => {
    if (currentIndex < cards.length - 4) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Loop back to the beginning
      setCurrentIndex(0)
    }
  }

  useEffect(() => {
    let interval
    
    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= cards.length - 4 ? 0 : prevIndex + 1
        )
      }, 5000) // Change every 5 seconds for smoother experience
    }

    return () => clearInterval(interval)
  }, [cards.length, isHovering])

  const visibleCards = 4 // Number of cards visible at once

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen flex items-center" ref={heroRef}>
        {/* Background with overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${bg_image})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/30 to-black/30"></div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <div className="z-10 flex flex-col justify-center mx-auto">
            {/* Hero Content */}
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Shaping the Future
                <span className="block text-white/90"></span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-white/80 mb-8 max-w-xl"
              >
                Elevate your professional skills with industry-leading design and engineering software courses tailored for your success.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-4"
              >
                <Link to="/courses" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Explore Now
                </Link>
                <a href="#explore-courses" className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white/10 transition duration-300">
                  View Courses
                </a>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <a 
            href="#explore-courses" 
            className="animate-bounce bg-white/20 p-2 w-10 h-10 rounded-full flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
        
        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </section>

      {/* Explore Courses Section */}
      <section id="explore-courses" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Explore Our Courses</h2>
            <p className="dark:text-white/70 max-w-2xl mx-auto">
              Dive into our comprehensive collection of professional design and engineering courses
              crafted by industry experts.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-semibold dark:text-white">
                Courses by <span className="dark:text-white font-bold">Medini</span>
              </h3>

              <div className="flex space-x-3">
                <button
                  onClick={slideLeft}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 shadow-md"
                  aria-label="Previous courses"
                >
                  <ChevronLeft className="w-6 h-6 dark:text-white" />
                </button>
                <button
                  onClick={slideRight}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 shadow-md"
                  aria-label="Next courses"
                >
                  <ChevronRight className="w-6 h-6 dark:text-white" />
                </button>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: cards.length - visibleCards + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Cards Slider */}
            <div 
              className="overflow-hidden" 
              ref={sliderRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div
                className="flex transition-all duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
              >
                {cards.map((card) => (
                  <div key={card.id} className="min-w-[25%] px-3">
                    {card.name === 'IT' ? (
                      <div 
                        className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full cursor-pointer"
                        onClick={() => setShowITPopup(true)}
                      >
                        <div className="relative">
                          <img 
                            src={card.image || "/placeholder.svg"} 
                            alt={card.name} 
                            className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-black text-xl mb-2">{card.name}</h3>
                          <p className="text-gray-600 text-sm">{card.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                            View Options
                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : card.name === 'AEC' ? (
                      <div 
                        className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full cursor-pointer"
                        onClick={() => setShowAECPopup(true)}
                      >
                        <div className="relative">
                          <img 
                            src={card.image || "/placeholder.svg"} 
                            alt={card.name} 
                            className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-black text-xl mb-2">{card.name}</h3>
                          <p className="text-gray-600 text-sm">{card.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                            View Options
                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : card.name === 'Product Design and Manufacturing' ? (
                      <div 
                        className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full cursor-pointer"
                        onClick={() => setShowProductDesignPopup(true)}
                      >
                        <div className="relative">
                          <img 
                            src={card.image || "/placeholder.svg"} 
                            alt={card.name} 
                            className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-black text-xl mb-2">{card.name}</h3>
                          <p className="text-gray-600 text-sm">{card.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                            View Options
                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link to={`/medinischoolofdesign${card.link}`}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                          <div className="relative">
                            <img 
                              src={card.image || "/placeholder.svg"} 
                              alt={card.name} 
                              className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-semibold text-black text-xl mb-2">{card.name}</h3>
                            <p className="text-gray-600 text-sm">{card.description}</p>
                            <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                              Learn more
                              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* View all courses button */}
            <div className="mt-12 text-center">
              <Link to="/courses" className="inline-flex items-center px-6 py-3 border border-white/30 rounded-md text-white hover:bg-white/10 transition duration-300">
                View All Courses
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <FeedbackSection />
      
      {/* IT Options Popup */}
      <AnimatePresence>
        {showITPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowITPopup(false)}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">IT Courses</h3>
                <button 
                  onClick={() => setShowITPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Java Full Stack', path: '/courses/java-fullstack' },
                    { name: 'Python Full Stack', path: '/courses/python-fullstack' },
                    { name: 'MERN Stack', path: '/courses/mern-stack' },
                    { name: 'Cloud Application Development', path: '/courses/cloud-app-dev' }
                  ].map((option, index) => (
                    <Link 
                      key={index} 
                      to={option.path}
                      className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium"
                      onClick={() => setShowITPopup(false)}
                    >
                      {option.name}
                      <span className="float-right">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AEC Options Popup */}
      <AnimatePresence>
        {showAECPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAECPopup(false)}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-bold text-gray-900">AEC Courses</h3>
                <button 
                  onClick={() => setShowAECPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Autodesk Section */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Autodesk
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { name: 'AutoCAD', path: '/courses/autocad' },
                      { name: 'AutoCAD Electrical', path: '/courses/autocad-electrical' },
                      { name: 'Revit Architecture', path: '/courses/revit-architecture' },
                      { name: 'Revit MEP', path: '/courses/revit-mep' },
                      { name: 'Revit Structure', path: '/courses/revit-structure' },
                      { name: 'Civil 3D', path: '/courses/civil-3d' },
                      { name: 'Navisworks', path: '/courses/navisworks' },
                      { name: 'InfraWorks', path: '/courses/infrawork' }
                    ].map((option, index) => (
                      <Link 
                        key={`autodesk-${index}`} 
                        to={option.path}
                        className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium"
                        onClick={() => setShowAECPopup(false)}
                      >
                        {option.name}
                        <span className="float-right">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Bentley Systems Section */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Bentley Systems
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { name: 'OpenRoads Designer', path: '/courses/openroads-designer' },
                      { name: 'OpenFlows WaterGEMS', path: '/courses/openflows-watergems' },
                      { name: 'OpenFlows SewerGEMS', path: '/courses/openflows-sewergems' },
                      { name: 'STAAD Pro', path: '/courses/staad-pro' },
                      { name: 'MicroStation', path: '/courses/microstation' }
                    ].map((option, index) => (
                      <Link 
                        key={`bentley-${index}`} 
                        to={option.path}
                        className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700 font-medium"
                        onClick={() => setShowAECPopup(false)}
                      >
                        {option.name}
                        <span className="float-right">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Others Section */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Others
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { name: 'SketchUp', path: '/courses/sketchup' },
                      { name: 'Lumion', path: '/courses/lumion' },
                      { name: 'V-Ray', path: '/courses/v-ray' },
                      { name: 'Enscape', path: '/courses/enscape' },
                      { name: 'Rhino', path: '/courses/rhino' },
                      { name: 'Grasshopper', path: '/courses/grasshopper' },
                      { name: 'ETABS', path: '/courses/etabs' },
                      { name: 'MS Project', path: '/courses/ms-project' },
                      { name: 'QGIS', path: '/courses/qgis' },
                      { name: 'Adobe Animate', path: '/courses/adobe-animate' },
                      { name: 'Photoshop', path: '/courses/photoshop' },
                      { name: 'Illustrator', path: '/courses/illustrator' }
                    ].map((option, index) => (
                      <Link 
                        key={`others-${index}`} 
                        to={option.path}
                        className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-purple-700 font-medium"
                        onClick={() => setShowAECPopup(false)}
                      >
                        {option.name}
                        <span className="float-right">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Product Design and Manufacturing Options Popup */}
      <AnimatePresence>
        {showProductDesignPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProductDesignPopup(false)}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-bold text-gray-900">Product Design and Manufacturing Courses</h3>
                <button 
                  onClick={() => setShowProductDesignPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Autodesk Section */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Autodesk
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { name: 'Fusion 360', path: '/courses/fusion' },
                      { name: 'AutoCAD (Mechanical)', path: '/courses/autocad' },
                      { name: 'Maya', path: '/courses/maya' },
                      { name: '3DS Max', path: '/courses/3ds-max' }
                    ].map((option, index) => (
                      <Link 
                        key={`autodesk-pdm-${index}`} 
                        to={option.path}
                        className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium"
                        onClick={() => setShowProductDesignPopup(false)}
                      >
                        {option.name}
                        <span className="float-right">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Dassault Section */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Dassault
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { name: 'SolidWorks', path: '/courses/solidworks' }
                    ].map((option, index) => (
                      <Link 
                        key={`dassault-${index}`} 
                        to={option.path}
                        className="block p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-red-700 font-medium"
                        onClick={() => setShowProductDesignPopup(false)}
                      >
                        {option.name}
                        <span className="float-right">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Others Section */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Others
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { name: 'CREO – PTC', path: '/courses/creo-ptc' },
                      { name: 'ANSYS', path: '/courses/ansys' },
                      { name: 'Adobe Animate', path: '/courses/adobe-animate' }
                    ].map((option, index) => (
                      <Link 
                        key={`others-pdm-${index}`} 
                        to={option.path}
                        className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-yellow-700 font-medium"
                        onClick={() => setShowProductDesignPopup(false)}
                      >
                        {option.name}
                        <span className="float-right">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HeroSection