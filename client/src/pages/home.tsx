import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import type { InsertContactSubmission } from "@shared/schema";
import { 
  Code, 
  Building, 
  ChartPie, 
  Brain, 
  Bot, 
  ChartLine, 
  Cloud, 
  Target, 
  Handshake, 
  Globe, 
  Lightbulb, 
  CheckSquare, 
  AlertTriangle, 
  Users, 
  Calculator,
  BookOpen,
  Sprout,
  Camera,
  Mountain,
  UtensilsCrossed,
  Mail,
  Linkedin,
  Phone,
  Menu,
  X,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink
} from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
  const [showMoreEducation, setShowMoreEducation] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent successfully!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsMobileMenuOpen(false);
        }
      }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Navbar background on scroll
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (window.scrollY > 50) {
        navbar?.classList.add('shadow-lg');
      } else {
        navbar?.classList.remove('shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, observerOptions);

    // Observe all sections except the hero
    document.querySelectorAll('section:not(#home)').forEach(section => {
      observer.observe(section);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const skillCategories = [
    {
      title: "AI & Digital Transformation",
      skills: [
        { icon: Brain, name: "Machine Learning", color: "from-soft-blue/10 to-gold/10 border-soft-blue/20" },
        { icon: Bot, name: "Process Automation", color: "from-gold/10 to-soft-blue/10 border-gold/20" },
        { icon: ChartLine, name: "Data Analytics", color: "from-navy/10 to-soft-blue/10 border-navy/20" },
        { icon: Cloud, name: "Cloud Solutions", color: "from-soft-blue/10 to-navy/10 border-soft-blue/20" },
      ]
    },
    {
      title: "Technical Tools",
      skills: [
        { icon: Code, name: "Figma", color: "from-purple-100 to-pink-100 border-purple-200" },
        { icon: Building, name: "Jira", color: "from-blue-100 to-indigo-100 border-blue-200" },
        { icon: ChartPie, name: "SQL", color: "from-orange-100 to-red-100 border-orange-200" },
        { icon: Code, name: "Python", color: "from-green-100 to-teal-100 border-green-200" },
      ]
    },
    {
      title: "Business Strategy",
      skills: [
        { icon: Target, name: "Strategic Planning", color: "from-gold/10 to-yellow-100 border-gold/20" },
        { icon: Handshake, name: "Stakeholder Management", color: "from-navy/10 to-blue-100 border-navy/20" },
        { icon: Globe, name: "Global Operations", color: "from-soft-blue/10 to-cyan-100 border-soft-blue/20" },
        { icon: Lightbulb, name: "Innovation", color: "from-purple-100 to-soft-blue/10 border-purple-200" },
      ]
    },
    {
      title: "Program Management",
      skills: [
        { icon: CheckSquare, name: "Agile/Scrum", color: "from-emerald-100 to-green-100 border-emerald-200" },
        { icon: AlertTriangle, name: "Risk Management", color: "from-red-100 to-pink-100 border-red-200" },
        { icon: Users, name: "Team Leadership", color: "from-blue-100 to-soft-blue/10 border-blue-200" },
        { icon: Calculator, name: "Budget Planning", color: "from-yellow-100 to-gold/10 border-yellow-200" },
      ]
    }
  ];

  const educationExperiences = [
    {
      id: 1,
      title: "MBA in Business Administration",
      institution: "University of California, Berkeley",
      year: "2020",
      description: "Specialized in Technology Management and Digital Innovation. Focused on strategic leadership and product development in technology-driven organizations.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Strategic Leadership", "Digital Innovation", "Product Management", "Data Analytics"],
      type: "degree",
      featured: true
    },
    {
      id: 2,
      title: "B.S. Computer Science",
      institution: "Stanford University",
      year: "2016",
      description: "Strong foundation in software engineering, data structures, and algorithms. Capstone project focused on machine learning applications in business processes.",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Software Engineering", "Machine Learning", "Data Structures", "Algorithms"],
      type: "degree",
      featured: true
    },
    {
      id: 3,
      title: "Fintech Product Manager Certificate",
      institution: "Citi Innovation Lab",
      year: "2022",
      description: "Intensive program focused on building scalable financial tools for global clients. Gained expertise in regulatory compliance and digital banking solutions.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Fintech", "Product Strategy", "Regulatory Compliance", "Digital Banking"],
      type: "certification",
      featured: true
    },
    {
      id: 4,
      title: "AI & Machine Learning Specialization",
      institution: "Google Cloud Platform",
      year: "2023",
      description: "Comprehensive training in cloud-based AI solutions and enterprise machine learning deployment. Focus on scalable AI architecture and MLOps practices.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["AI/ML", "Cloud Computing", "MLOps", "Enterprise Architecture"],
      type: "certification",
      featured: true
    },
    {
      id: 5,
      title: "Agile & Scrum Master Certification",
      institution: "Scaled Agile Framework",
      year: "2021",
      description: "Advanced certification in agile methodologies and scaled agile frameworks. Focus on leading cross-functional teams and managing enterprise-level agile transformations.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Agile", "Scrum", "Team Leadership", "Process Optimization"],
      type: "certification",
      featured: false
    },
    {
      id: 6,
      title: "Data Science for Business Leaders",
      institution: "MIT Sloan Executive Education",
      year: "2022",
      description: "Executive program focused on leveraging data science for strategic business decisions. Emphasis on data-driven transformation and analytics leadership.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Data Science", "Business Strategy", "Analytics", "Executive Leadership"],
      type: "executive",
      featured: false
    }
  ];

  const featuredEducation = educationExperiences.filter(exp => exp.featured);
  const additionalEducation = educationExperiences.filter(exp => !exp.featured);

  const nextEducationSlide = () => {
    setCurrentEducationIndex((prev) => 
      prev === featuredEducation.length - 1 ? 0 : prev + 1
    );
  };

  const prevEducationSlide = () => {
    setCurrentEducationIndex((prev) => 
      prev === 0 ? featuredEducation.length - 1 : prev - 1
    );
  };

  const interests = [
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Passionate about staying ahead of technology trends through online courses, industry publications, and thought leadership content.",
      color: "from-soft-blue to-gold"
    },
    {
      icon: Sprout,
      title: "Sustainability",
      description: "Advocating for sustainable business practices and exploring how technology can drive environmental responsibility.",
      color: "from-gold to-navy"
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Actively mentoring young professionals and contributing to diversity initiatives in technology and business.",
      color: "from-navy to-soft-blue"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments and stories through the lens, with a particular interest in architectural and nature photography.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mountain,
      title: "Travel & Culture",
      description: "Exploring diverse cultures and landscapes, always seeking new perspectives that enrich both personal and professional growth.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: UtensilsCrossed,
      title: "Culinary Arts",
      description: "Experimenting with global cuisines and discovering how food brings people together across cultures and communities.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-inter font-bold text-navy">Pooja Suresh</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-home">Home</a>
              <a href="#education" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-education">Education</a>
              <a href="#journey" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-journey">Journey</a>
              <a href="#projects" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-projects">Projects</a>
              <a href="#skills" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-skills">Skills</a>
              <a href="#interests" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-interests">Interests</a>
              <a href="#contact" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-contact">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-home">Home</a>
                <a href="#education" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-education">Education</a>
                <a href="#journey" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-journey">Journey</a>
                <a href="#projects" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-projects">Projects</a>
                <a href="#skills" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-skills">Skills</a>
                <a href="#interests" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-interests">Interests</a>
                <a href="#contact" className="text-warm-gray hover:text-soft-blue transition-colors" data-testid="nav-mobile-contact">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-soft-blue/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fadeIn">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200" 
              alt="Pooja Suresh professional headshot" 
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/20 shadow-xl object-cover"
              data-testid="img-hero-profile"
            />
            
            <h1 className="text-5xl md:text-7xl font-inter font-bold text-white mb-6">
              Hello, I'm <span className="gradient-text">Pooja</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              I build or help build — products, plans, and purpose-driven progress.
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              Program Manager passionate about AI & Digital Transformation, 
              bridging the gap between innovative technology and strategic business outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#projects" 
                className="bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg font-semibold transition-colors"
                data-testid="button-view-work"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-lg font-semibold transition-all"
                data-testid="button-get-in-touch"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 professional-gradient opacity-0 translate-y-5 transition-all duration-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-6">Education & Professional Development</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A continuous journey of learning, from foundational degrees to cutting-edge certifications in technology and business.
            </p>
          </div>

          {/* Featured Education Carousel */}
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentEducationIndex * 100}%)` }}
              >
                {featuredEducation.map((edu, index) => (
                  <div key={edu.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 education-card rounded-2xl shadow-2xl overflow-hidden border border-white/30 h-full backdrop-blur-sm">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
                            src={edu.image} 
                            alt={`${edu.institution} campus or related imagery`}
                            className="w-full h-48 md:h-full object-cover"
                            data-testid={`img-education-${edu.id}`}
                          />
                        </div>
                        <div className="md:w-2/3 p-8">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-soft-blue to-gold rounded-xl flex items-center justify-center">
                              {edu.type === 'degree' ? (
                                <GraduationCap className="text-white w-6 h-6" />
                              ) : (
                                <Award className="text-white w-6 h-6" />
                              )}
                            </div>
                            <div className="ml-4">
                              <h3 className="text-2xl font-inter font-bold text-navy">{edu.title}</h3>
                              <p className="text-soft-blue font-semibold">{edu.institution}</p>
                            </div>
                            <div className="ml-auto">
                              <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-semibold">
                                {edu.year}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-warm-gray leading-relaxed mb-6">
                            {edu.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {edu.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm skill-badge"
                                data-testid={`tag-education-${edu.id}-${tagIndex}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevEducationSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 glass-effect rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:border-white/50"
              data-testid="button-education-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextEducationSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 glass-effect rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:border-white/50"
              data-testid="button-education-next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredEducation.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEducationIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentEducationIndex 
                      ? 'bg-white scale-110 shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  data-testid={`dot-education-${index}`}
                />
              ))}
            </div>
          </div>

          {/* Show More Section */}
          <div className="text-center">
            <button
              onClick={() => setShowMoreEducation(!showMoreEducation)}
              className="inline-flex items-center gap-2 glass-effect text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all border border-white/30 hover:border-white/50"
              data-testid="button-show-more-education"
            >
              <Plus className={`w-5 h-5 transition-transform ${showMoreEducation ? 'rotate-45' : ''}`} />
              {showMoreEducation ? 'Show Less' : 'Show More Certifications'}
            </button>
          </div>

          {/* Additional Education - Collapsible */}
          <div className={`transition-all duration-500 overflow-hidden ${
            showMoreEducation ? 'max-h-screen opacity-100 mt-8' : 'max-h-0 opacity-0'
          }`}>
            <div className="grid md:grid-cols-2 gap-6">
              {additionalEducation.map((edu) => (
                <Card key={edu.id} className="card-hover bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <div className="flex">
                    <div className="w-24 flex-shrink-0">
                      <img 
                        src={edu.image} 
                        alt={`${edu.institution} related imagery`}
                        className="w-full h-full object-cover"
                        data-testid={`img-additional-education-${edu.id}`}
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-inter font-semibold text-navy text-sm">{edu.title}</h4>
                          <p className="text-soft-blue text-xs">{edu.institution}</p>
                        </div>
                        <span className="bg-gold/10 text-gold px-2 py-1 rounded text-xs">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-warm-gray text-xs leading-relaxed mb-3">
                        {edu.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {edu.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="bg-navy/10 text-navy px-2 py-1 rounded text-xs"
                            data-testid={`tag-additional-education-${edu.id}-${tagIndex}`}
                          >
                            {tag}
                          </span>
                        ))}
                        {edu.tags.length > 2 && (
                          <span className="text-warm-gray text-xs">+{edu.tags.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">My Journey</h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              A narrative blending software development, program management, and strategic business transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern office environment with team collaboration" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-journey-office"
              />
            </div>
            <div>
              <div className="space-y-8">
                <Card className="card-hover bg-gradient-to-br from-soft-blue/5 to-gold/5 p-6 rounded-xl border border-soft-blue/20">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-soft-blue rounded-xl flex items-center justify-center">
                        <Code className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-inter font-semibold text-navy ml-4">Software Development Foundation</h3>
                    </div>
                    <p className="text-warm-gray leading-relaxed">
                      Started my career building robust software solutions, developing a deep understanding of technical architecture and user-centric design principles.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-gradient-to-br from-gold/5 to-soft-blue/5 p-6 rounded-xl border border-gold/20">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                        <Building className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-inter font-semibold text-navy ml-4">Program Management Evolution</h3>
                    </div>
                    <p className="text-warm-gray leading-relaxed">
                      Transitioned into program management, orchestrating complex initiatives and driving cross-functional collaboration to deliver enterprise-scale solutions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-gradient-to-br from-navy/5 to-soft-blue/5 p-6 rounded-xl border border-navy/20">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                        <ChartLine className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-inter font-semibold text-navy ml-4">Strategic Business Impact</h3>
                    </div>
                    <p className="text-warm-gray leading-relaxed">
                      Now focusing on AI & Digital Transformation initiatives, bridging technology innovation with strategic business outcomes and sustainable growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">Featured Projects</h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Showcasing impactful products and strategic initiatives that drive business transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LTIMindtree Project */}
            <Card className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Professional workspace with technology setup" 
                className="w-full h-48 object-cover"
                data-testid="img-project-ltimindtree"
              />
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-soft-blue to-gold rounded-lg flex items-center justify-center">
                    <Building className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-navy ml-3">Enterprise Solutions @ LTIMindtree</h3>
                </div>
                <p className="text-warm-gray mb-4 leading-relaxed">
                  Led the development and deployment of AI-powered enterprise solutions, managing cross-functional teams and delivering scalable products that enhanced operational efficiency by 40%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-soft-blue/10 text-soft-blue px-3 py-1 rounded-full text-sm">AI/ML</span>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm">Enterprise</span>
                  <span className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm">Program Management</span>
                </div>
              </CardContent>
            </Card>

            {/* Micron Project */}
            <Card className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Modern office with business analytics and planning" 
                className="w-full h-48 object-cover"
                data-testid="img-project-micron"
              />
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-navy rounded-lg flex items-center justify-center">
                    <ChartPie className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-navy ml-3">Strategic Planning @ Micron</h3>
                </div>
                <p className="text-warm-gray mb-4 leading-relaxed">
                  Spearheaded global procurement automation initiatives and strategic planning processes, implementing data-driven approaches that optimized supply chain operations and reduced costs by 25%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm">Automation</span>
                  <span className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm">Global Procurement</span>
                  <span className="bg-soft-blue/10 text-soft-blue px-3 py-1 rounded-full text-sm">Strategic Planning</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Projects Row */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="card-hover bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-br from-soft-blue to-gold rounded-xl flex items-center justify-center mb-4">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">AI Process Automation</h4>
                <p className="text-sm text-warm-gray">Implemented intelligent automation workflows that reduced manual processing time by 60%.</p>
              </CardContent>
            </Card>
            <Card className="card-hover bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-navy rounded-xl flex items-center justify-center mb-4">
                  <Users className="text-white w-6 h-6" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">Cross-Functional Leadership</h4>
                <p className="text-sm text-warm-gray">Led teams of 15+ professionals across multiple time zones and disciplines.</p>
              </CardContent>
            </Card>
            <Card className="card-hover bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-br from-navy to-soft-blue rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">Academic Partnerships</h4>
                <p className="text-sm text-warm-gray">Collaborated with universities on research initiatives and knowledge transfer programs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">Skills & Expertise</h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Technical proficiency and strategic acumen across diverse domains and industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="text-center">
                <h3 className="font-inter font-semibold text-navy mb-6">{category.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <Card key={skillIndex} className={`skill-badge bg-gradient-to-br ${skill.color} p-4 rounded-xl transition-all duration-300 hover:scale-105`}>
                      <CardContent className="p-0 text-center">
                        <skill.icon className="text-2xl mb-2 mx-auto w-6 h-6" />
                        <p className="text-sm font-medium text-navy">{skill.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Icons Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-inter font-semibold text-navy text-center mb-8">Tools & Technologies</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center w-16 h-12 bg-gray-100 rounded-lg">
                <Code className="w-8 h-8 text-gray-600" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center w-16 h-12 bg-gray-100 rounded-lg">
                <Building className="w-8 h-8 text-gray-600" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center w-16 h-12 bg-gray-100 rounded-lg">
                <ChartLine className="w-8 h-8 text-gray-600" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center w-16 h-12 bg-gray-100 rounded-lg">
                <Cloud className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">Beyond Work</h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Personal passions and interests that fuel creativity and drive continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <Card key={index} className="card-hover bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-200">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-br ${interest.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <interest.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-navy mb-4">{interest.title}</h3>
                  <p className="text-warm-gray leading-relaxed">
                    {interest.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">Let's Connect</h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              Ready to collaborate on your next big initiative? Let's discuss how we can drive meaningful impact together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-soft-blue rounded-xl flex items-center justify-center">
                    <Mail className="text-white w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-inter font-semibold text-navy">Email</h3>
                    <p className="text-warm-gray">pooja.suresh@email.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                    <Linkedin className="text-white w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-inter font-semibold text-navy">LinkedIn</h3>
                    <p className="text-warm-gray">linkedin.com/in/poojasuresh</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                    <Phone className="text-white w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-inter font-semibold text-navy">Phone</h3>
                    <p className="text-warm-gray">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-warm-gray text-sm leading-relaxed">
                  <strong className="text-navy">Open to:</strong> Program management opportunities, AI/Digital transformation consulting, strategic planning engagements, and thought leadership collaborations.
                </p>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-navy/5 to-soft-blue/5 p-8 rounded-2xl border border-soft-blue/20">
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-navy">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-colors"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-navy">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@company.com" 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-colors"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-navy">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this about?" 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-colors"
                              data-testid="input-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-navy">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4} 
                              placeholder="Tell me about your project or opportunity..." 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-colors resize-none"
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-gradient-to-r from-soft-blue to-navy hover:from-navy hover:to-soft-blue text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-inter font-bold mb-2">Pooja Suresh</h3>
              <p className="text-white/80">Building the future, one program at a time.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/80 hover:text-gold transition-colors" data-testid="link-footer-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-gold transition-colors" data-testid="link-footer-github">
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>&copy; 2024 Pooja Suresh. All rights reserved. | Designed with passion for innovation and impact.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
