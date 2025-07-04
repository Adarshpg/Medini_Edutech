import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header3"
import Footer from "./components/Footer"
import { ThemeProvider } from "./components/ThemeProvider"
import "./index.css"
import Home from "./pages/Home"
import CourseDetailsPage from "./components/MediniEdutech/CourseDetailsPage"
import ScrollToTop from "./components/ScrollToTop"
import CoursesPage from "./pages/CoursePage"
import { Courses } from "./components/MediniEdutech/Courses"
import Contact from "./components/MediniEdutech/Contact"
import AboutPage from "./pages/AboutPage"
import BlogPage from "./pages/BlogPage"
import ContactPage from "./pages/ContactPage"
import InternshipPage from "./pages/internship/InternshipPage"
import ItInternshipPage from "./pages/internship/ItInternshipPage"
import StudentDashboard from "./components/StudentDashboard"
import Login from "./components/Login";
import React, { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(!!localStorage.getItem('dashboard_token'));
  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('dashboard_token');
    setLoggedIn(false);
  };
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 mt-10">
            <ScrollToTop />
            <Routes>
              <Route path="/mediniedutech/" element={<Home />} />
              <Route path="/mediniedutech/courses/:courseName" element={<CourseDetailsPage />} />
              <Route path="/mediniedutech/courses" element={<Courses />} />
              <Route path="/mediniedutech/contact" element={<ContactPage />} />
              <Route path="/mediniedutech/about" element={<AboutPage />} />
              <Route path="/mediniedutech/blog" element={<BlogPage />} />
              <Route path="/mediniedutech/internship" element={<InternshipPage />} />
              <Route path="/mediniedutech/internship/it" element={<ItInternshipPage />} />
              <Route path="/mediniedutech/dashboard" element={loggedIn ? <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px'}}><div style={{display:'flex',justifyContent:'flex-end',margin:'40px 0 14px 0'}}><button style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,cursor:'pointer',fontSize:17,boxShadow:'0 2px 8px #0002'}} onClick={handleLogout}>Logout</button></div><StudentDashboard /></div> : <Login onLogin={handleLogin} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

