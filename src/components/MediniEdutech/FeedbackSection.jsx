import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';

function FeedbackSection() {
    const [currentFeedback, setCurrentFeedback] = useState(0);
    const feedbacks = [
        {
            quote: "The BIM for Construction course at Medini School of Design completely transformed my career. The hands-on training and industry-relevant curriculum gave me the skills I needed to excel in my field.",
            author: "Priya Sharma",
            title: "Architectural Designer",
            company: "BuildTech Solutions"
        },
        {
            quote: "The instructors at Medini School of Design are true industry experts. Their practical knowledge and guidance during the AEC program helped me understand complex concepts and apply them in real-world scenarios.",
            author: "Rahul Patel",
            title: "Civil Engineer",
            company: "Infrastructure Innovations"
        },
        {
            quote: "The Product Design and Manufacturing course offered a perfect blend of theory and practical applications. The state-of-the-art software training has been invaluable in my current role.",
            author: "Ananya Singh",
            title: "Product Designer",
            company: "Creative Solutions Ltd"
        },
        {
            quote: "Enrolling in the BIM for Architecture program was the best decision for my professional growth. The curriculum is comprehensive and up-to-date with industry standards.",
            author: "Vikram Mehta",
            title: "BIM Coordinator",
            company: "Modern Architects Inc"
        }
    ];

    const handleNext = () => {
        setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
    };

    const handlePrev = () => {
        setCurrentFeedback((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
    };

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        Student Testimonials
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Hear from our students about their learning experience at Medini School of Design
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentFeedback}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-lg p-8 relative overflow-hidden"
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 left-6 text-blue-100 dark:text-slate-700 w-16 h-16 z-0" />

                            <div className="relative z-10">
                                <p className="text-xl italic text-gray-700 dark:text-gray-200 mb-6 text-center relative z-10">
                                    "{feedbacks[currentFeedback].quote}"
                                </p>

                                <div className="flex items-center justify-center mt-6">
                                    <div className="bg-blue-100 dark:bg-slate-700 rounded-full p-2 mr-4">
                                        <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {feedbacks[currentFeedback].author}
                                        </h4>
                                        <p className="text-blue-600 dark:text-blue-400">
                                            {feedbacks[currentFeedback].title}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {feedbacks[currentFeedback].company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center mt-8 space-x-4">
                        <button 
                            onClick={handlePrev}
                            className="bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 p-3 rounded-full shadow-md hover:bg-blue-50 dark:hover:bg-slate-600 transition-all"
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 p-3 rounded-full shadow-md hover:bg-blue-50 dark:hover:bg-slate-600 transition-all"
                            aria-label="Next testimonial"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {feedbacks.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentFeedback(index)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    currentFeedback === index 
                                        ? 'bg-blue-600 dark:bg-blue-400 w-6' 
                                        : 'bg-gray-300 dark:bg-slate-600'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeedbackSection;
