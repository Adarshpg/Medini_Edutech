import React from 'react';
import { motion } from 'framer-motion';

import autodesk from "@/assets/Logos/autodesk-learning-partner-logo-rgb-black.png"
import bentley from "@/assets/Logos/Bentley-Training-Partner-Logo.png"
import sketchUp from "@/assets/Logos/Sketchup_Colour.png"
import chaos from "@/assets/Logos/Chaos_idHNVPKG7k_0.svg"
import ptc from "@/assets/Logos/ptc_logo.jpeg"

export function PartnersSection() {
    const partners = [
        { image: autodesk, name: "Autodesk" },
        { image: bentley, name: "Bentley" },
        { image: sketchUp, name: "SketchUp" },
        { image: chaos, name: "Chaos" },
        { image: ptc, name: "PTC" },
        { image: autodesk, name: "Autodesk" },
        { image: bentley, name: "Bentley" },
        { image: sketchUp, name: "SketchUp" },
        { image: chaos, name: "Chaos" },
        { image: ptc, name: "PTC" },
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customBlue/5 to-transparent"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full bg-customBlue/10 border border-customBlue/20 px-6 py-2 text-sm font-semibold text-customBlue backdrop-blur-sm mb-6">
                        Technology Partners
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Our{" "}
                        <span className="text-customBlue bg-gradient-to-r from-customBlue to-blue-600 bg-clip-text text-transparent">
                            Technology
                        </span>{" "}
                        Partners
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Collaborating with industry leaders to deliver innovative solutions and transform digital experiences for our clients worldwide.
                    </p>
                </div>

                <div className="relative w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
                    
                    <div className="overflow-hidden">
                        <motion.div 
                            className="flex"
                            animate={{
                                x: [0, "-50%"],
                                transition: {
                                    ease: "linear",
                                    duration: 20,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }
                            }}
                        >
                            {partners.map((partner, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 px-8 flex items-center justify-center"
                                >
                                    <div className="group relative p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700">
                                        <img
                                            src={partner.image}
                                            alt={partner.name}
                                            className="max-h-12 w-auto transition-all duration-300 group-hover:scale-110 filter dark:brightness-90 group-hover:brightness-110"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Stats section */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center group">
                        <div className="text-3xl md:text-4xl font-bold text-customBlue mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl md:text-4xl font-bold text-customBlue mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Courses</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl md:text-4xl font-bold text-customBlue mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Happy Students</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl md:text-4xl font-bold text-customBlue mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Support</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartnersSection;