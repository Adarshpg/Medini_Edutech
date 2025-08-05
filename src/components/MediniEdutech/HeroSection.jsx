import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useInView } from "framer-motion"
import FeedbackSection from "./FeedbackSection"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const bg_image = "/IMAGES/getty-images-OB7KJ7WtHOs-unsplash.jpg"
const autocad = "/IMAGES/AutoCAD.jpg"
const civil3d = "/IMAGES/tool-inc-ApKnJHXu6Hg-unsplash.jpg"
const solidworks = "/IMAGES/osman-talha-dikyar-PomM7aa5m18-unsplash.jpg"
const microstation = "/IMAGES/getty-images-ItieuN1ec0k-unsplash.jpg"
const itImage = "/IMAGES/thisisengineering-AvGIBmvdcac-unsplash.jpg"
const infraworks = "/IMAGES/getty-images-KD_fT_T4D24-unsplash.jpg"
const bimArchitecture = "/IMAGES/BIM_for_Architecture.jpg"
const bimConstruction = "/IMAGES/BIM_for_Construction.png"
const bimInfrastructure = "/IMAGES/BIM_for_Infrastructure.png"
const productDesignImg = "/IMAGES/Product Design and Manufacturing.png"
const aecIndustryImg = "/IMAGES/AEC Industry.png"
const itIndustryImg = "/IMAGES/IT.png"

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [visibleCards, setVisibleCards] = useState(4)
  const [showITPopup, setShowITPopup] = useState(false)
  const [showAECPopup, setShowAECPopup] = useState(false)
  const [showProductDesignPopup, setShowProductDesignPopup] = useState(false)
  const sliderRef = useRef(null)
  const heroRef = useRef(null)

  // Add state for calendar value
  const [date, setDate] = useState(new Date());

  const cards = [
    {
      id: 1,
      image: bimConstruction,
      name: "BIM for Construction",
      description: "Master construction project management with BIM",
      link: "/courses/bim-construction"
    },
    {
      id: 2,
      image: bimInfrastructure,
      name: "BIM for Infrastructure",
      description: "Advanced infrastructure design and management",
      link: "/courses/bim-infrastructure"
    },
    {
      id: 3,
      image: "/IMAGES/BIM_for_ Architecture.jpg",
      name: "BIM for Architecture",
      description: "Architectural design and documentation with BIM",
      link: "/courses/revit-architecture"
    },
    {
      id: 4,
      image: productDesignImg,
      name: "Product Design and Manufacturing",
      description: "Industrial design and manufacturing solutions",
      link: "/courses/fusion-360"
    },
    {
      id: 5,
      image: aecIndustryImg,
      name: "AEC",
      description: "Architecture, Engineering & Construction design solutions",
      link: "/courses/revit-architecture"
    },
    {
      id: 6,
      image: itIndustryImg,
      name: 'IT',
      description: "Software development courses including Java, Python, MERN Stack, and Cloud technologies",
      link: "/courses/it"
    }
  ]

  // Animation variants for the cards
  const cardContainerRef = useRef(null);
  const isInView = useInView(cardContainerRef, { once: true, amount: 0.1 });

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1, // Stagger the animation for each card
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Handle responsive number of visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, cards.length - visibleCards) : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= cards.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    let interval
    
    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= cards.length - visibleCards ? 0 : prevIndex + 1
        )
      }, 5000) // Change every 5 seconds for smoother experience
    }

    return () => clearInterval(interval)
  }, [isHovering, cards.length, visibleCards])

  // Custom class names for the calendar with improved navigation
  const calendarClassNames = {
    root: 'bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-xs transform transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
    navigation: 'flex justify-between items-center mb-5 relative',
    navigationLabel: 'text-white text-lg font-semibold text-center flex-grow',
    monthView: 'text-white',
    weekdays: 'flex justify-between text-white/70 text-xs font-medium mb-3',
    weekdaysRow: 'flex justify-between',
    weekday: 'w-8 h-8 flex items-center justify-center text-sm',
    days: 'grid grid-cols-7 gap-1',
    day: 'relative w-8 h-8 flex items-center justify-center rounded-full text-white/90 hover:bg-white/10 transition-all duration-200 text-sm font-medium',
    daySelected: '!bg-gradient-to-br from-blue-500 to-blue-600 text-white !font-semibold shadow-md',
    dayToday: '!border-2 !border-blue-400 font-semibold',
    dayDisabled: 'text-white/20',
    navigationPrevButton: 'absolute left-0 p-2 rounded-full hover:bg-white/10 transition-colors',
    navigationNextButton: 'absolute right-0 p-2 rounded-full hover:bg-white/10 transition-colors',
    tile: 'relative',
  };

  // Sample events data - replace with your actual events
  const events = [
    { date: '2025-08-10', title: 'Webinar: Design Thinking' },
    { date: '2025-08-15', title: 'Workshop: 3D Modeling' },
    { date: '2025-08-20', title: 'Course: Advanced CAD' },
  ];

  // Check if a date has an event
  const hasEvent = (date) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return (
        date.getDate() === eventDate.getDate() &&
        date.getMonth() === eventDate.getMonth() &&
        date.getFullYear() === eventDate.getFullYear()
      );
    });
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        date.getDate() === eventDate.getDate() &&
        date.getMonth() === eventDate.getMonth() &&
        date.getFullYear() === eventDate.getFullYear()
      );
    });
  };

  return (
    <div className="relative">
      <section className="relative overflow-hidden h-screen flex items-center" ref={heroRef}>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${bg_image})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/30 to-black/30"></div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <div className="z-10 flex flex-col lg:flex-row justify-between items-center mx-auto gap-12">
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
                <Link to="/mediniedutech/contact" className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white/10 transition duration-300">
                  Contact us
                </Link>
              </motion.div>
            </div>
            
            {/* Calendar Component */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.03] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl overflow-hidden">
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                  
                  <h3 className="text-white text-xl font-semibold mb-4 text-center relative z-10">
                    Upcoming Events
                    <span className="block w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-2"></span>
                  </h3>
                  
                  <Calendar
                    onChange={setDate}
                    value={date}
                    className={calendarClassNames}
                    tileContent={({ date, view }) => {
                      if (view === 'month' && hasEvent(date)) {
                        return (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"></div>
                        );
                      }
                      return null;
                    }}
                    tileClassName={({ date: tileDate, view }) => {
                      const isSelected = date.getDate() === tileDate.getDate() && 
                                      date.getMonth() === tileDate.getMonth() && 
                                      date.getFullYear() === tileDate.getFullYear();
                      const isToday = new Date().toDateString() === tileDate.toDateString();
                      
                      let classes = [];
                      if (isSelected) classes.push(calendarClassNames.daySelected);
                      if (isToday && !isSelected) classes.push(calendarClassNames.dayToday);
                      if (hasEvent(tileDate)) classes.push('font-medium');
                      
                      return classes.join(' ');
                    }}
                    formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                    nextLabel={
                      <div className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    }
                    prevLabel={
                      <div className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </div>
                    }
                    next2Label={null}
                    prev2Label={null}
                    formatMonthYear={(locale, date) => {
                      return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                    }}
                  />
                  
                  {/* Upcoming events list */}
                  <div className="mt-6">
                    <h4 className="text-white/80 text-sm font-medium mb-3 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                      Today's Events
                    </h4>
                    <div className="space-y-2">
                      {getEventsForDate(new Date()).length > 0 ? (
                        getEventsForDate(new Date()).map((event, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-3 text-sm text-white/90 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-white/60">10:00 AM - 11:30 AM</div>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/50 text-sm italic">No events scheduled</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="text-sm text-blue-300 hover:text-white font-medium transition-colors">
                      View All Events →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
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
      <section id="explore-courses" className="py-16" ref={cardContainerRef}>
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
            </div>

            {/* Cards Section - Horizontal on Desktop, Vertical on Mobile */}
            <div className="relative">
              <div className="md:flex md:space-x-6 md:overflow-x-auto md:pb-4 md:-mx-4 md:px-4 space-y-6 md:space-y-0 scrollbar-hide md:flex-row-reverse">
                <div className="md:flex md:space-x-6">
                {cards.map((card, index) => (
                  <motion.div 
                    key={card.id} 
                    className="w-full md:w-80 md:flex-shrink-0"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index}
                    variants={cardVariants}
                  >
                    {card.name === 'IT' ? (
                      <div 
                        className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full cursor-pointer"
                        onClick={() => setShowITPopup(true)}
                      >
                        <div className="relative">
                          <img 
                            src={card.image || "/placeholder.svg"} 
                            alt={card.name} 
                            className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110" 
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
                            className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110" 
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
                            className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110" 
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
                      <Link to={card.link ? (card.link.startsWith('/') ? card.link : `/${card.link}`) : '#'}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                          <div className="relative">
                            <img 
                              src={card.image || "/placeholder.svg"} 
                              alt={card.name} 
                              className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110" 
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
                  </motion.div>
                ))}
                </div>
              </div>
            </div>

            {/* Mobile View - Now using the same cards but with different layout */}
            <div className="md:hidden space-y-6 hidden">
              {cards.map((card) => (
                <div key={card.id} className="w-full">
                  {card.name === 'IT' ? (
                    <div 
                      className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl h-full cursor-pointer"
                      onClick={() => setShowITPopup(true)}
                    >
                      <div className="relative">
                        <img 
                          src={card.image || "/placeholder.svg"} 
                          alt={card.name} 
                          className="w-full h-48 object-cover" 
                        />
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
                      className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl h-full cursor-pointer"
                      onClick={() => setShowAECPopup(true)}
                    >
                      <div className="relative">
                        <img 
                          src={card.image || "/placeholder.svg"} 
                          alt={card.name} 
                          className="w-full h-48 object-cover" 
                        />
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
                      className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl h-full cursor-pointer"
                      onClick={() => setShowProductDesignPopup(true)}
                    >
                      <div className="relative">
                        <img 
                          src={card.image || "/placeholder.svg"} 
                          alt={card.name} 
                          className="w-full h-48 object-cover" 
                        />
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
                    <Link to={card.link ? (card.link.startsWith('/') ? card.link : `/${card.link}`) : '#'}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl h-full">
                        <div className="relative">
                          <img 
                            src={card.image || "/placeholder.svg"} 
                            alt={card.name} 
                            className="w-full h-48 object-cover" 
                          />
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
            
            {/* View all courses button */}
            <div className="mt-12 text-center">
              <Link to="/courses" className="inline-flex items-center px-6 py-3 border border-white/30 rounded-md text-white hover:bg-white/10 transition duration-300">
                View All Courses
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7V3" />
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
            onClick={(e) => e.stopPropagation()}
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
              
              <div className="p-4 sm:p-6">
                {/* Autodesk Section */}
                <div className="mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Autodesk
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
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
                        className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium text-sm sm:text-base"
                        onClick={() => setShowAECPopup(false)}
                      >
                        <span className="truncate pr-2">{option.name}</span>
                        <span className="flex-shrink-0">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Bentley Systems Section */}
                <div className="mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Bentley Systems
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
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
                        className="flex items-center justify-between p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700 font-medium text-sm sm:text-base"
                        onClick={() => setShowAECPopup(false)}
                      >
                        <span className="truncate pr-2">{option.name}</span>
                        <span className="flex-shrink-0">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Others Section */}
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Others
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
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
                        className="flex items-center justify-between p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-purple-700 font-medium text-sm sm:text-base"
                        onClick={() => setShowAECPopup(false)}
                      >
                        <span className="truncate pr-2">{option.name}</span>
                        <span className="flex-shrink-0">&rarr;</span>
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
              
              <div className="p-4 sm:p-6">
                {/* Autodesk Section */}
                <div className="mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Autodesk
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'Fusion 360', path: '/courses/fusion' },
                      { name: 'AutoCAD (Mechanical)', path: '/courses/autocad' },
                      { name: 'Maya', path: '/courses/maya' },
                      { name: '3DS Max', path: '/courses/3ds-max' }
                    ].map((option, index) => (
                      <Link 
                        key={`autodesk-pdm-${index}`} 
                        to={option.path}
                        className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium text-sm sm:text-base"
                        onClick={() => setShowProductDesignPopup(false)}
                      >
                        <span className="truncate pr-2">{option.name}</span>
                        <span className="flex-shrink-0">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Dassault Section */}
                <div className="mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Dassault
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'SolidWorks', path: '/courses/solidworks' }
                    ].map((option, index) => (
                      <Link 
                        key={`dassault-${index}`} 
                        to={option.path}
                        className="flex items-center justify-between p-3 sm:p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-red-700 font-medium text-sm sm:text-base"
                        onClick={() => setShowProductDesignPopup(false)}
                      >
                        <span className="truncate pr-2">{option.name}</span>
                        <span className="flex-shrink-0">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Others Section */}
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Others
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'CREO – PTC', path: '/courses/creo-ptc' },
                      { name: 'ANSYS', path: '/courses/ansys' },
                      { name: 'Adobe Animate', path: '/courses/adobe-animate' }
                    ].map((option, index) => (
                      <Link 
                        key={`others-pdm-${index}`} 
                        to={option.path}
                        className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-yellow-700 font-medium text-sm sm:text-base"
                        onClick={() => setShowProductDesignPopup(false)}
                      >
                        <span className="truncate pr-2">{option.name}</span>
                        <span className="flex-shrink-0">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection
