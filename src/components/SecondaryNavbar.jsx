import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const SecondaryNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-16 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#1a5f7a]/90 backdrop-blur-md shadow-sm' : 'bg-[#5A827E]'} border-b border-[#1a5f7a]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Left side navigation */}
          <div className="flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-item text-white ${isActive ? 'text-amber-300 font-medium' : 'hover:text-amber-200'}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-item text-white ${isActive ? 'text-amber-300 font-medium' : 'hover:text-amber-200'}`}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-item text-white ${isActive ? 'text-amber-300 font-medium' : 'hover:text-amber-200'}`}
            >
              Contact
            </NavLink>
          </div>
          
          {/* Right side (can be used for additional links or search) */}
          <div className="flex items-center">
            {/* Add any right-aligned items here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNavbar;
