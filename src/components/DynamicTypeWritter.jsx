import React, { useState, useEffect } from 'react';

const DynamicTypingHeadline = () => {
  const headlines = [
    {
      title: "TRANSFORMING TECHNOLOGY",
      subtitle: "Support With the Right Technology"
    },
    {
        title: "FORGING THE FUTURE",
        subtitle: "MEDINI EDUTECH"
    },
    {
      title: "FROM PLANNING TO HANDOVER",
      subtitle: "BIM CONSTRUCT"
    },
    {
      title: "WHERE EDUCATION MEETS DIGITAL EXCELLENCE",
      subtitle: "EDUPHYGITAL"
    },
    {
      title: "STARTUP SUPPORT ECOSYSTEM",
      subtitle: "BUILDDSPACE"
    },
    {
        title: "NURTURING TALENT. BUILDING SOFTWARE. POWERING FUTURES.",
        subtitle: "TECHVRUDDHI"
    },
     {
      title: "DIGIDHVANI",
      subtitle: "Digital Marketing Solutions"
    },
    {
      title: "ENGINEERING POSSIBILITIES THROUGH 3D PRINTING",
      subtitle: "MECHSETU"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentHeadline = headlines[currentIndex].title;
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentHeadline.length) {
          setDisplayText(prev => currentHeadline.slice(0, prev.length + 1));
          setTypingSpeed(100);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setTypingSpeed(50);
        } else {
          // Move to next headline
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % headlines.length);
        }
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [displayText, isDeleting, currentIndex, headlines, typingSpeed]);

  const currentSubtitle = headlines[currentIndex].subtitle;

  return (
    <div className="">
      <h1 className="text-4xl text-white font-inter md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        {displayText}
        <span className="animate-blink">|</span>
      </h1>
      <p className="text-lg text-white dark:text-gray-300 max-w-[600px] mx-auto">
        {currentSubtitle}
      </p>
    </div>
  );
};

export default DynamicTypingHeadline;
