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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 mt-10">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses/:courseName" element={<CourseDetailsPage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/internship" element={<InternshipPage />} />
              <Route path="/internship/it" element={<ItInternshipPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

