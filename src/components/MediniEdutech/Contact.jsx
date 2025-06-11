import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for future backend logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background px-4">
      {/* Header Section */}
      <header className="bg-customBlue text-primary-foreground rounded-lg">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl text-white md:text-5xl font-bold mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Have a idea in mind or want to discuss how we can help your business grow? 
            Fill out the form below, and our team will get back to you soon.
          </motion.p>
        </div>
      </header>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-card border rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span>No. 2943/E,3rd Floor, 40, Service Rd, opposite Shri Maruthi Mandira, Hosahalli Extension, Vijayanagar, Bengaluru, Karnataka 560040</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <span>(+91) 99000 81006 </span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <span>connect@medini.in</span>
            </div>
          </div>
          <div className="mt-8 bg-muted/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p>Monday - Saturday: 9:00 AM - 8:30 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <div className="space-y-4">
            <Input 
              id="name" 
              placeholder="Your Name" 
              required 
              className="w-full"
              value={formData.name}
              onChange={handleChange}
            />
            <Input 
              id="email" 
              type="email" 
              placeholder="Your Email" 
              required 
              className="w-full"
              value={formData.email}
              onChange={handleChange}
            />
            <Input 
              id="phone" 
              placeholder="Your Phone Number (Optional)" 
              className="w-full"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select 
              value={formData.service} 
              onValueChange={handleServiceChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulting">Strategic Consulting</SelectItem>
                <SelectItem value="development">Custom Software Development</SelectItem>
                <SelectItem value="cloud">Cloud Solutions</SelectItem>
                <SelectItem value="data">Data & Analytics</SelectItem>
                <SelectItem value="security">Cybersecurity</SelectItem>
                <SelectItem value="ai">AI & Machine Learning</SelectItem>
              </SelectContent>
            </Select>
            <Textarea 
              id="message" 
              placeholder="Tell us about your project or inquiry..." 
              rows={5} 
              required 
              className="w-full"
              value={formData.message}
              onChange={handleChange}
            />
            <Button 
              type="submit" 
              className="w-full group bg-customBlue"
            >
              <span className="flex text-white items-center justify-center">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;