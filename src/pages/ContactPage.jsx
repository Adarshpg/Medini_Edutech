import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: "No. 2943/E, 3rd Floor, 40, Service Rd, opposite Shri Maruthi Mandira, Hosahalli Extension, Vijayanagar, Bengaluru, Karnataka 560040",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "(+91) 99000 81006",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "connect@medini.in",
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Happy Students" },
    { icon: Award, number: "50+", label: "Expert Instructors" },
    { icon: MessageSquare, number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground my-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-400 dark:bg-customBlue">
        <div className="absolute inset-0 bg-gradient-to-br from-customBlue/90 to-customBlue/80"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Start a 
              <span className="text-white/90"> Conversation</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your career with cutting-edge technology skills? 
              Our expert team is here to guide you every step of the way.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Whether you're looking to upskill, change careers, or explore new technologies, 
                we're here to help you achieve your goals.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-customBlue/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-customBlue/10 group-hover:bg-customBlue/20 transition-colors duration-300">
                      <info.icon className="h-6 w-6 text-customBlue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground mb-2">{info.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{info.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-customBlue/5 border border-customBlue/20 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-customBlue" />
                <h3 className="font-semibold text-foreground">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-medium text-foreground">9:00 AM - 8:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-red-500">Closed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-lg border border-border"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-card-foreground mb-3">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      required 
                      className="h-12 bg-background border-input focus:border-customBlue focus:ring-customBlue/20 rounded-xl"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      required 
                      className="h-12 bg-background border-input focus:border-customBlue focus:ring-customBlue/20 rounded-xl"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      placeholder="Enter your phone number" 
                      className="h-12 bg-background border-input focus:border-customBlue focus:ring-customBlue/20 rounded-xl"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Service of Interest
                    </label>
                    <Select 
                      value={formData.service} 
                      onValueChange={handleServiceChange}
                    >
                      <SelectTrigger className="h-12 bg-background border-input focus:border-customBlue focus:ring-customBlue/20 rounded-xl">
                        <SelectValue placeholder="Select a course/service" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="bim">BIM Construction</SelectItem>
                        <SelectItem value="techvritti">TechVritti</SelectItem>
                        <SelectItem value="mechsetu">Mechsetu</SelectItem>
                        <SelectItem value="eduphygital">EDUPHYGITAL</SelectItem>
                        <SelectItem value="digidhvani">DigiDhvani</SelectItem>
                        <SelectItem value="builddspace">BuilddSpace</SelectItem>
                        <SelectItem value="consulting">General Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your goals, questions, or how we can help you..." 
                    rows={6} 
                    required 
                    className="bg-background border-input focus:border-customBlue focus:ring-customBlue/20 rounded-xl resize-none"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-customBlue hover:bg-customBlue/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why Choose Medini Technologies?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              Join thousands of students who have successfully transformed their careers with our expert-led programs
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "98%", label: "Success Rate" },
                { number: "15+", label: "Years Experience" },
                { number: "10+", label: "Industry Partners" },
                { number: "500+", label: "Graduates Placed" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-card rounded-2xl border border-border hover:border-customBlue/30 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-customBlue dark:text-white mb-2">{item.number}</div>
                  <div className="text-muted-foreground text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;