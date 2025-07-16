"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, LayoutGrid, Monitor, Cpu, Code, Box } from "lucide-react"
import coursesData from "../courses.json"

// Provider data with icons
const providers = [
  { id: "AUTODESK", name: "Autodesk", icon: <LayoutGrid className="w-5 h-5" /> },
  { id: "BENTLEY", name: "Bentley", icon: <Monitor className="w-5 h-5" /> },
  { id: "DASSAULT", name: "Dassault", icon: <Cpu className="w-5 h-5" /> },
  { id: "OTHER", name: "Other", icon: <Box className="w-5 h-5" /> },
  { id: "IT", name: "Programming", icon: <Code className="w-5 h-5" /> },
];

export function Courses() {
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Card style for provider cards
  const providerCardStyle = {
    minWidth: '250px',
    width: '250px',
    height: '200px',
    flex: '0 0 auto',
    scrollSnapAlign: 'start',
    margin: '0 16px 24px 0',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  };

  // Handle provider selection
  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
    window.location.href = `/courses/${providerId.toLowerCase()}`;
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Browse Courses by Provider</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {providers.map((provider) => (
              <div 
                key={provider.id}
                onClick={() => handleProviderSelect(provider.id)}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer flex flex-col items-center text-center"
                style={providerCardStyle}
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  {provider.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{provider.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {provider.id === 'AUTODESK' && 'CAD, BIM, and more'}
                  {provider.id === 'BENTLEY' && 'Infrastructure engineering'}
                  {provider.id === 'DASSAULT' && '3D design and PLM'}
                  {provider.id === 'OTHER' && 'Various software solutions'}
                  {provider.id === 'IT' && 'Programming and development'}
                </p>
                <div className="mt-auto w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Not sure where to start?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our expert advisors can help you choose the right course based on your career goals and experience level.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Course Recommendation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
