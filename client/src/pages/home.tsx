import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
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
      const href = target.getAttribute("href");
      if (href?.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMobileMenuOpen(false);
        }
      }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Navbar background on scroll
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (window.scrollY > 50) {
        navbar?.classList.add("shadow-lg");
      } else {
        navbar?.classList.remove("shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    }, observerOptions);

    // Observe all sections except the hero
    document.querySelectorAll("section:not(#home)").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const skillCategories = [
    {
      title: "AI & Digital Transformation",
      skills: [
        {
          icon: Brain,
          name: "Machine Learning",
          color: "from-soft-blue/10 to-gold/10 border-soft-blue/20",
        },
        {
          icon: Bot,
          name: "Process Automation",
          color: "from-gold/10 to-soft-blue/10 border-gold/20",
        },
        {
          icon: ChartLine,
          name: "Data Analytics",
          color: "from-navy/10 to-soft-blue/10 border-navy/20",
        },
        {
          icon: Cloud,
          name: "Cloud Solutions",
          color: "from-soft-blue/10 to-navy/10 border-soft-blue/20",
        },
      ],
    },
    {
      title: "Technical Tools",
      skills: [
        {
          icon: Code,
          name: "Figma",
          color: "from-purple-100 to-pink-100 border-purple-200",
        },
        {
          icon: Building,
          name: "Jira",
          color: "from-blue-100 to-indigo-100 border-blue-200",
        },
        {
          icon: ChartPie,
          name: "SQL",
          color: "from-orange-100 to-red-100 border-orange-200",
        },
        {
          icon: Code,
          name: "Python",
          color: "from-green-100 to-teal-100 border-green-200",
        },
      ],
    },
    {
      title: "Business Strategy",
      skills: [
        {
          icon: Target,
          name: "Strategic Planning",
          color: "from-gold/10 to-yellow-100 border-gold/20",
        },
        {
          icon: Handshake,
          name: "Stakeholder Management",
          color: "from-navy/10 to-blue-100 border-navy/20",
        },
        {
          icon: Globe,
          name: "Global Operations",
          color: "from-soft-blue/10 to-cyan-100 border-soft-blue/20",
        },
        {
          icon: Lightbulb,
          name: "Innovation",
          color: "from-purple-100 to-soft-blue/10 border-purple-200",
        },
      ],
    },
    {
      title: "Program Management",
      skills: [
        {
          icon: CheckSquare,
          name: "Agile/Scrum",
          color: "from-emerald-100 to-green-100 border-emerald-200",
        },
        {
          icon: AlertTriangle,
          name: "Risk Management",
          color: "from-red-100 to-pink-100 border-red-200",
        },
        {
          icon: Users,
          name: "Team Leadership",
          color: "from-blue-100 to-soft-blue/10 border-blue-200",
        },
        {
          icon: Calculator,
          name: "Budget Planning",
          color: "from-yellow-100 to-gold/10 border-yellow-200",
        },
      ],
    },
  ];

  // Education data
  const educationData = [
    {
      id: 1,
      title: "Master of Science in Management Information Systems",
      institution: "Texas A&M University",
      year: "2024 - 2026",
      description:
        "Specialized in Technology Management and Digital Innovation. Focused on strategic leadership and product development in technology-driven organizations.",
      image:
        "https://www.tamu.edu/_files/images/admissions/aerial-tamu-water-tower-sunset.JPG",
      tags: [
        "Strategic Leadership",
        "Digital Innovation",
        "Product Management",
        "Data Analytics",
      ],
      type: "degree",
    },
    {
      id: 2,
      title: "Bachelor's in Computer Science & Engineering",
      institution: "Nitte Meenakshi Institute of Technology",
      year: "2017 - 2021",
      description:
        "Strong foundation in software engineering, data structures, and algorithms. Capstone project focused on machine learning applications in business processes.",
      image:
        "https://data.testprepkart.com/university/Nitte_Meenakshi_Institute_of_Technology_testprepkart_61c1a39200d28.png",
      tags: [
        "Software Engineering",
        "Machine Learning",
        "Data Structures",
        "Algorithms",
      ],
      type: "degree",
    },
    {
      id: 3,
      title: "AI & Machine Learning Specialization",
      institution: "Google Cloud Platform",
      year: "2023",
      description:
        "Comprehensive training in cloud-based AI solutions and enterprise machine learning deployment. Focus on scalable AI architecture and MLOps practices.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["AI/ML", "Cloud Computing", "MLOps", "Enterprise Architecture"],
      type: "certification",
    },
    {
      id: 4,
      title: "Data Science for Business Leaders",
      institution: "MIT Sloan Executive Education",
      year: "2022",
      description:
        "Executive program focused on leveraging data science for strategic business decisions. Emphasis on data-driven transformation and analytics leadership.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: [
        "Data Science",
        "Business Strategy",
        "Analytics",
        "Executive Leadership",
      ],
      type: "executive",
    }
  ];

  // Work Experience data
  const workExperienceData = [
    {
      id: 1,
      title: "Program Manager - AI & Digital Transformation",
      company: "Micron Technology",
      period: "May 2025 - Present",
      description:
        "Leading AI & Digital Transformation initiatives that enhance global procurement processes. Managing cross-functional teams to deliver enterprise-scale automation solutions.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw61divHtbUlLVp43pq2knONUWn1FB6AmX7A&s",
      tags: [
        "Program Management",
        "AI/ML",
        "Global Procurement",
        "Digital Transformation",
      ],
      type: "current",
    },
    {
      id: 2,
      title: "Associate Program Manager",
      company: "LTIMindtree",
      period: "2022 - 2024",
      description:
        "Led development and deployment of AI-powered enterprise solutions. Managed cross-functional teams delivering scalable products that enhanced operational efficiency by 40%.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Enterprise Solutions", "Team Leadership", "Agile", "Product Development"],
      type: "previous",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2021 - 2022",
      description:
        "Developed robust software solutions with focus on user-centric design and scalable architecture. Built foundation in technical skills that inform current program management approach.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      tags: ["Software Development", "Full-Stack", "User Experience", "Architecture"],
      type: "previous",
    },
  ];

  // Projects data for carousel
  const projectsData = [
    {
      id: 1,
      title: "Enterprise AI Platform",
      company: "LTIMindtree",
      description: "Led the development and deployment of AI-powered enterprise solutions, managing cross-functional teams and delivering scalable products that enhanced operational efficiency by 40%.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["AI/ML", "Enterprise", "Program Management", "Digital Transformation"],
      impact: "40% efficiency improvement",
    },
    {
      id: 2,
      title: "Global Procurement Automation",
      company: "Micron Technology",
      description: "Designed and implemented strategic planning initiatives for global procurement automation, resulting in streamlined operations and significant cost savings across multiple regions.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["Strategic Planning", "Automation", "Global Operations", "Cost Optimization"],
      impact: "25% cost reduction",
    },
    {
      id: 3,
      title: "Digital Banking Solutions",
      company: "Banking Innovation Lab",
      description: "Built scalable financial tools with focus on regulatory compliance and digital banking innovations. Delivered comprehensive product strategy and user experience improvements.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["Fintech", "Digital Banking", "Compliance", "Product Strategy"],
      impact: "300% user engagement",
    },
  ];

  const nextProjectSlide = () => {
    setCurrentProjectIndex((prev) => 
      prev === projectsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevProjectSlide = () => {
    setCurrentProjectIndex((prev) => 
      prev === 0 ? projectsData.length - 1 : prev - 1
    );
  };

  const interests = [
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description:
        "Passionate about staying ahead of technology trends through online courses, industry publications, and thought leadership content.",
      color: "from-soft-blue to-gold",
    },
    {
      icon: Sprout,
      title: "Sustainability",
      description:
        "Advocating for sustainable business practices and exploring how technology can drive environmental responsibility.",
      color: "from-gold to-navy",
    },
    {
      icon: Users,
      title: "Mentorship",
      description:
        "Actively mentoring young professionals and contributing to diversity initiatives in technology and business.",
      color: "from-navy to-soft-blue",
    },
    {
      icon: Camera,
      title: "Photography",
      description:
        "Capturing moments and stories through the lens, with a particular interest in architectural and nature photography.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Mountain,
      title: "Travel & Culture",
      description:
        "Exploring diverse cultures and landscapes, always seeking new perspectives that enrich both personal and professional growth.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: UtensilsCrossed,
      title: "Culinary Arts",
      description:
        "Experimenting with global cuisines and discovering how food brings people together across cultures and communities.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-inter font-bold text-navy">
              Pooja Suresh
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-home"
              >
                Home
              </a>
              <a
                href="#education"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-education"
              >
                Education
              </a>
              <a
                href="#experience"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-experience"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-projects"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-skills"
              >
                Skills
              </a>
              <a
                href="#interests"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-interests"
              >
                Interests
              </a>
              <a
                href="#contact"
                className="text-warm-gray hover:text-soft-blue transition-colors"
                data-testid="nav-contact"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-home"
                >
                  Home
                </a>
                <a
                  href="#education"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-education"
                >
                  Education
                </a>
                <a
                  href="#experience"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-experience"
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-projects"
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-skills"
                >
                  Skills
                </a>
                <a
                  href="#interests"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-interests"
                >
                  Interests
                </a>
                <a
                  href="#contact"
                  className="text-warm-gray hover:text-soft-blue transition-colors"
                  data-testid="nav-mobile-contact"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden"
      >
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
              I build or help build — products, plans, and purpose-driven
              progress.
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              Program Manager passionate about AI & Digital Transformation,
              bridging the gap between innovative technology and strategic
              business outcomes.
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
      <section
        id="education"
        className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Education
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Academic foundation and continuous learning through degrees, certifications, and executive education.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {educationData.map((edu) => (
              <Card key={edu.id} className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={edu.image}
                      alt={`${edu.institution} campus or related imagery`}
                      className="w-full h-48 md:h-full object-cover"
                      data-testid={`img-education-${edu.id}`}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-soft-blue to-gold rounded-xl flex items-center justify-center">
                        {edu.type === "degree" ? (
                          <GraduationCap className="text-white w-6 h-6" />
                        ) : (
                          <Award className="text-white w-6 h-6" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-inter font-bold text-navy">
                          {edu.title}
                        </h3>
                        <p className="text-soft-blue font-semibold text-sm">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-semibold">
                        {edu.year}
                      </span>
                    </div>

                    <p className="text-warm-gray leading-relaxed mb-4 text-sm">
                      {edu.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-navy/10 text-navy px-2 py-1 rounded-full text-xs skill-badge"
                          data-testid={`tag-education-${edu.id}-${tagIndex}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section
        id="experience"
        className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Work Experience
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Professional journey from software engineering to program management, driving digital transformation and business impact.
            </p>
          </div>

          <div className="space-y-8">
            {workExperienceData.map((work) => (
              <Card key={work.id} className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={work.image}
                      alt={`${work.company} workplace or related imagery`}
                      className="w-full h-48 md:h-full object-cover"
                      data-testid={`img-work-${work.id}`}
                    />
                  </div>
                  <div className="md:w-3/4 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-inter font-bold text-navy mb-2">
                          {work.title}
                        </h3>
                        <p className="text-soft-blue font-semibold text-lg mb-1">
                          {work.company}
                        </p>
                        <p className="text-warm-gray font-medium">
                          {work.period}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        work.type === 'current' 
                          ? 'bg-green-500' 
                          : 'bg-gray-400'
                      }`}>
                      </div>
                    </div>

                    <p className="text-warm-gray leading-relaxed mb-6">
                      {work.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-soft-blue/10 text-soft-blue px-3 py-1 rounded-full text-sm skill-badge"
                          data-testid={`tag-work-${work.id}-${tagIndex}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Carousel */}
      <section
        id="projects"
        className="py-20 professional-gradient opacity-0 translate-y-5 transition-all duration-700 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Showcasing impactful products and strategic initiatives that drive business transformation and innovation.
            </p>
          </div>

          {/* Projects Carousel */}
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
              >
                {projectsData.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 education-card rounded-2xl shadow-2xl overflow-hidden border border-white/30 h-full backdrop-blur-sm">
                      <div className="md:flex">
                        <div className="md:w-2/5">
                          <img 
                            src={project.image} 
                            alt={`${project.title} project visualization`}
                            className="w-full h-64 md:h-full object-cover"
                            data-testid={`img-project-${project.id}`}
                          />
                        </div>
                        <div className="md:w-3/5 p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-3xl font-inter font-bold text-navy mb-3">
                                {project.title}
                              </h3>
                              <p className="text-soft-blue font-semibold text-lg mb-2">
                                {project.company}
                              </p>
                              <div className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-semibold inline-block">
                                {project.impact}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-warm-gray leading-relaxed mb-6 text-lg">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="bg-navy/10 text-navy px-4 py-2 rounded-full text-sm skill-badge font-medium"
                                data-testid={`tag-project-${project.id}-${tagIndex}`}
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
              onClick={prevProjectSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 glass-effect rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:border-white/50"
              data-testid="button-project-prev"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextProjectSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 glass-effect rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:border-white/50"
              data-testid="button-project-next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProjectIndex 
                      ? 'bg-white scale-110 shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  data-testid={`dot-project-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Skills & Expertise
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Technical proficiency and strategic acumen across diverse domains
              and industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="text-center">
                <h3 className="font-inter font-semibold text-navy mb-6">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <Card
                      key={skillIndex}
                      className={`skill-badge bg-gradient-to-br ${skill.color} p-4 rounded-xl transition-all duration-300 hover:scale-105`}
                    >
                      <CardContent className="p-0 text-center">
                        <skill.icon className="text-2xl mb-2 mx-auto w-6 h-6" />
                        <p className="text-sm font-medium text-navy">
                          {skill.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Icons Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-inter font-semibold text-navy text-center mb-8">
              Tools & Technologies
            </h3>
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
      <section
        id="interests"
        className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Beyond Work
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Personal passions and interests that fuel creativity and drive
              continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <Card
                key={index}
                className="card-hover bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-200"
              >
                <CardContent className="p-0">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${interest.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <interest.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-navy mb-4">
                    {interest.title}
                  </h3>
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
      <section
        id="contact"
        className="py-20 bg-white opacity-0 translate-y-5 transition-all duration-700"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-navy mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              Ready to collaborate on your next big initiative? Let's discuss
              how we can drive meaningful impact together.
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
                    <h3 className="font-inter font-semibold text-navy">
                      Email
                    </h3>
                    <p className="text-warm-gray">pooja.suresh@email.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                    <Linkedin className="text-white w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-inter font-semibold text-navy">
                      LinkedIn
                    </h3>
                    <p className="text-warm-gray">
                      linkedin.com/in/poojasuresh
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                    <Phone className="text-white w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-inter font-semibold text-navy">
                      Phone
                    </h3>
                    <p className="text-warm-gray">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-warm-gray text-sm leading-relaxed">
                  <strong className="text-navy">Open to:</strong> Program
                  management opportunities, AI/Digital transformation
                  consulting, strategic planning engagements, and thought
                  leadership collaborations.
                </p>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-navy/5 to-soft-blue/5 p-8 rounded-2xl border border-soft-blue/20">
              <CardContent className="p-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-navy">
                            Name
                          </FormLabel>
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
                          <FormLabel className="text-sm font-medium text-navy">
                            Email
                          </FormLabel>
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
                          <FormLabel className="text-sm font-medium text-navy">
                            Subject
                          </FormLabel>
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
                          <FormLabel className="text-sm font-medium text-navy">
                            Message
                          </FormLabel>
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
                      {contactMutation.isPending
                        ? "Sending..."
                        : "Send Message"}
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
              <h3 className="text-2xl font-inter font-bold mb-2">
                Pooja Suresh
              </h3>
              <p className="text-white/80">
                Building the future, one program at a time.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-white/80 hover:text-gold transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-gold transition-colors"
                data-testid="link-footer-github"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>
              &copy; 2024 Pooja Suresh. All rights reserved. | Designed with
              passion for innovation and impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
