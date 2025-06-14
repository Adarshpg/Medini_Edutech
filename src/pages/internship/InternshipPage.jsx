import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Code, Building2, Settings, Check, Play, Headset, FileText, BarChart2, Briefcase, Star,
  Award, Users, Clock, Laptop, Zap, BookOpen, UserCheck, DollarSign, TrendingUp, CheckCircle, GitBranch
} from 'lucide-react';
import InternshipRegistrationForm from '../../components/InternshipRegistrationForm';

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-blue-500 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{children}</p>
  </div>
);

// Course details mapping
const courseDetails = {
  'ai-ml': {
    title: 'AI & Machine Learning Internship',
    duration: '6 Months',
    price: '₹15,000',
    highlights: [
      'Deep Learning with TensorFlow & Keras',
      'Neural Networks & Computer Vision',
      'Natural Language Processing (NLP)',
      'Real-world AI projects',
      'Model Deployment & MLOps',
      'Industry case studies'
    ]
  },
  'data-science': {
    title: 'Data Science Internship',
    duration: '5 Months',
    price: '₹12,000',
    highlights: [
      'Data Analysis with Python & Pandas',
      'SQL for Data Science',
      'Data Visualization with Matplotlib & Seaborn',
      'Machine Learning basics',
      'Statistical Analysis',
      'Real-world data projects'
    ]
  },
  'java-fullstack': {
    title: 'Java Fullstack Internship',
    duration: '6 Months',
    price: '₹14,000',
    highlights: [
      'Core Java & Advanced Java',
      'Spring Boot & Spring Security',
      'React.js for frontend',
      'RESTful APIs & Microservices',
      'Database Management',
      'Project Deployment'
    ]
  },
  'python-fullstack': {
    title: 'Python Fullstack Internship',
    duration: '5 Months',
    price: '₹13,000',
    highlights: [
      'Python & Django Framework',
      'Django REST Framework',
      'Frontend with React.js',
      'Database Management with PostgreSQL',
      'API Development',
      'Project Deployment'
    ]
  },
  'default': {
    title: 'Internship Program',
    duration: 'Varies by program',
    price: 'Contact for pricing',
    highlights: [
      'Hands-on project experience',
      'Industry mentorship',
      'Practical training',
      'Certificate upon completion',
      'Job placement assistance',
      'Lifetime access to learning materials'
    ]
  }
};

const InternshipPage = () => {
  const location = useLocation();
  const [selectedProgram, setSelectedProgram] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [showItSpecializations, setShowItSpecializations] = React.useState(false);
  
  // Get current course details based on selection
  const currentCourse = selectedCourse ? courseDetails[selectedCourse] : courseDetails['default'];

  // Handle program selection and update showItSpecializations
  const handleProgramChange = (e) => {
    const value = e.target.value;
    setSelectedProgram(value);
    setShowItSpecializations(value === 'it');
    // Clear selected course when program changes
    if (value !== 'it') {
      setSelectedCourse('');
    }
  };

  // Handle course selection
  const handleCourseSelect = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Handle state from navigation (fix: also respond to location.key)
  useEffect(() => {
    if (location.state) {
      const { selectedProgram, selectedCourse } = location.state;
      if (selectedProgram) {
        setSelectedProgram(selectedProgram);
        setShowItSpecializations(selectedProgram === 'it');
        if (selectedCourse) {
          setSelectedCourse(selectedCourse);
        } else {
          setSelectedCourse('');
        }
        // Scroll to registration form if coming from a course page
        if (window.location.hash === '#registration-form') {
          const element = document.getElementById('registration-form');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  }, [location.state, location.key]);
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div 
        className="relative text-white pt-24 pb-16 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/IMAGES/ilya-sonin-IsX2ZkbSk1Y-unsplash.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-full relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg text-left">
                Internship cum Final Year Project Program
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium drop-shadow-lg text-left max-w-3xl">
                Bridge the gap between academia and industry with hands-on experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a 
                  href="#registration-form" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200 text-center sm:text-left"
                >
                  Register Now
                </a>
                <a 
                  href="#programs" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200 text-center sm:text-left"
                >
                  View Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Cards */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Internship Programs</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* IT Program Card */}
            <Link to="/internship/it" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 block focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ textDecoration: 'none' }}>
              <div className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">IT Internship</h3>
                <ul className="space-y-3 mb-6">
                  {['AI & Machine Learning', 'Data Science', 'Java Fullstack', 'Python Fullstack'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/internship#registration-form"
                  state={{ selectedProgram: 'it' }}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
                >
                  Explore Program
                </Link>
              </div>
            </Link>

            {/* Civil Program Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-green-600 h-2"></div>
              <div className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Civil Engineering</h3>
                <ul className="space-y-3 mb-6">
                  {['Structural Design', 'Construction Management', 'AutoCAD & Revit', 'Project Planning'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/internship#registration-form"
                  state={{ selectedProgram: 'civil' }}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
                >
                  Explore Program
                </Link>
              </div>
            </div>

            {/* Mechanical Program Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-amber-600 h-2"></div>
              <div className="p-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Mechanical Engineering</h3>
                <ul className="space-y-3 mb-6">
                  {['CAD/CAM', 'Product Design', 'Manufacturing', 'Thermodynamics'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/internship#registration-form"
                  state={{ selectedProgram: 'mechanical' }}
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
                >
                  Explore Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Internship Program?</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our comprehensive internship program is designed to provide you with hands-on experience and industry-relevant skills that will set you apart in your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Headset className="h-10 w-10 text-blue-600" />,
                title: 'Expert Mentors',
                description: 'Learn from industry experts with years of experience in their respective fields.'
              },
              {
                icon: <FileText className="h-10 w-10 text-green-600" />,
                title: 'Project Certificate',
                description: 'Earn a recognized certificate upon successful completion of your internship.'
              },
              {
                icon: <BarChart2 className="h-10 w-10 text-amber-600" />,
                title: 'Practical Training',
                description: 'Work on real-world projects to gain hands-on experience.'
              },
              {
                icon: <Briefcase className="h-10 w-10 text-purple-600" />,
                title: 'Job Assistance',
                description: 'Get guidance and support for job placements after completing the program.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content and Registration Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Content */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{currentCourse.title}</h2>
              <div className="space-y-6 text-gray-700">
                

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">Program Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This Comprehensive Hybrid Program is designed to bridge the gap between academic learning and industry requirements. Our program enables students to complete their academic final year projects with originality and technical depth while gaining job-ready skills in AI/ML or Full Stack Development through hands-on labs and real-world applications.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <span className="font-semibold">Key Features:</span> The program offers a dual-track training system where students can choose between AI/ML (covering Data Science and Model Deployment) or Full Stack Development (using Python/Java with modern frameworks). Our industry-aligned projects allow students to solve real-world problems under the guidance of experienced tech mentors.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We provide hybrid learning flexibility with online live classes and optional in-person lab access in select cities. The program is designed with placement-focused outcomes, including resume building, mock interviews, and internship certification to ensure students are job-ready upon completion.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">Why This Program?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <span className="font-semibold">1. Independent Project Development:</span> Conceptualize, design, and deploy your own project from scratch. Encourages problem-solving, innovation, and teamwork.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <span className="font-semibold">2. Resume & Portfolio Boost:</span> GitHub repos, live demos, and technical reports to showcase to recruiters. Projects align with industry use cases (e.g., predictive analytics, scalable web apps).
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <span className="font-semibold">3. Domain-Specialized Training:</span>
                    <span className="block font-medium text-blue-700 mt-1">AI/ML Track:</span>
                    <span className="text-sm">Python, TensorFlow, NLP, Computer Vision, Cloud Deployment</span>
                    <span className="block font-medium text-blue-700 mt-2">Full Stack Track:</span>
                    <span className="text-sm">Django/Spring Boot, REST APIs, Databases (SQL/NoSQL), CI/CD</span>
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <span className="font-semibold">4. Affordable Career Investment:</span> <span className="font-medium">₹8000 per student</span> for 16 weeks of training + project support.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">5. Job Readiness:</span> Mock interviews, technical presentation practice, and LinkedIn profile reviews.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Program Structure</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold">Phase 1: Foundation (Weeks 1-4)</span> - This initial phase focuses on building a strong foundation in core concepts, tools, and technologies essential for the chosen track. Students will become familiar with the fundamental principles and prepare for hands-on project work.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold">Phase 2: Project Development (Weeks 5-12)</span> - During this intensive phase, students will engage in hands-on project work under the guidance of experienced mentors. This is where theoretical knowledge is applied to practical, real-world scenarios.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">Phase 3: Deployment & Presentation (Weeks 13-16)</span> - The final phase focuses on deploying the completed project and preparing professional presentations. Students will learn how to showcase their work effectively to potential employers and stakeholders.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-0.5">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">100% Placement Support</h4>
                      <p className="text-gray-600">Tie-ups with 500+ hiring partners (TCS, Infosys, startups).</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-0.5">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Mock Interviews & Resume Workshops</h4>
                      <p className="text-gray-600">Tailored for freshers/experienced professionals.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-0.5">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Lifetime Access to LMS</h4>
                      <p className="text-gray-600">Course materials, project templates, and interview Q&A.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-0.5">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Internship Certificate</h4>
                      <p className="text-gray-600">Recognized by academia and employers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div id="registration-form" className="lg:w-1/3">
              <div className="sticky top-6">
                <InternshipRegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Simplified */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Kickstart Your Career?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Join our internship program and gain the skills and experience needed to succeed in your career.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Apply Now
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <p className="mt-4 text-sm text-blue-200">
              Next batch starting soon. Limited seats available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;
