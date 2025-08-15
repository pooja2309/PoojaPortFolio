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
  Paintbrush,
  PaintRoller,
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
          name: "Gen AI + CoPilot",
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
          name: "Visual Studio, IntelliJ, Eclise IDE",
          color: "from-purple-100 to-pink-100 border-purple-200",
        },
        {
          icon: Building,
          name: "Jira, Target Process, Asana, Confluence",
          color: "from-blue-100 to-indigo-100 border-blue-200",
        },
        {
          icon: ChartPie,
          name: "SQL, MongoDB, PowerBI, Snowflake DB",
          color: "from-orange-100 to-red-100 border-orange-200",
        },
        {
          icon: Code,
          name: "Python, Javascript, Java",
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
          name: "Global Procurement & Operations",
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
          name: "Agile/Scrum Methodologies",
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
          name: "Resource Allocation & Budgeting",
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
        "Project Management",
        "Advanced Data Management",
        "System Analysis & Design",
        "Corporate Information Planning",
        "Business Information Security",
        "Predictive Analytics for Business",
        "Survey of Management"
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
        "https://lh3.googleusercontent.com/p/AF1QipOWQSMvHGQtCR_jERiJgyp5tzwaF8XnJMCpTPXT=s1360-w1360-h1020-rw",
      tags: [
        "Software Engineering",
        "Machine Learning",
        "Data Structures",
        "Algorithms",
      ],
      type: "degree",
    },
    {
      id: 2,
      title: "Certifications",
      institution: "Program / Project & Product Management",

      image:
        "https://content.wolfram.com/sites/39/2021/02/wolfram-u-certifications.png",
      tags: [
        "Google Project Management",
        "Certified Scrum Master",
        "AI for Product Managers",
        "ISTQB",
        "and more..",
      ],
      type: "degree",
    },
  ];

  // Work Experience data
  const workExperienceData = [
    {
      id: 1,
      title: "Program Manager Intern - AI & Digital Transformation",
      company: "Micron Technology",
      period: "May 2025 - Present",
      description:
        "Leading AI & Digital Transformation initiatives that enhance global procurement processes. Managing cross-functional teams to deliver enterprise-scale automation solutions.",
      image:
        "https://dmassets.micron.com/is/image/microntechnology/adobestock-609624221-1?ts=1738621994376&dpr=off",
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
      title: "Teaching Assistant & Grader",
      company: "Mays Business School - Flex MBA",
      period: "2025-Present",
      description:
        "Supported instruction & evaluation for graduate-level courses: SCMT 610 – Business Analytics and MGMT 638 – Strategic Entrepreneurship. Assisted with course delivery, grading assignments and exams, providing feedback to students, and facilitating academic support to enhance learning outcomes.",
      image:
        "https://news.mays.tamu.edu/wp-content/uploads/2025/01/2020242_N51-1024x652.jpg",
      tags: ["Business Analysis", "Teaching", "Grading", "Project Planning"],
      type: "previous",
    },

    {
      id: 3,
      title: "Software Engineer",
      company: "LTIMindtree",
      period: "2021 - 2024",
      description:
        "Contributed to quality assurance efforts for a marketing client in the Media & Entertainment sector, focusing on automating test suites using Cypress, WebdriverIO, and Protractor. Skilled in leveraging testing frameworks such as Mocha, Jasmine, Cucumber, and JUnit, with expertise in Java and JavaScript to drive efficient test automation and deliver thorough quality evaluations.",
      image:
        "https://omdia.tech.informa.com/-/media/tech/omdia/omdia-website-enhancement-oct-2023/media-and-entertainment-coverage.jpg?rev=d0cd11b816ca4ae5a4c8197210e42bf9",
      tags: [
        "Automation",
        "Software Development",
        "Agile Project Management",
        "Stakeholder Engagement",
        "Quality Assurance",
      ],
      type: "previous",
    },
  ];

  // Projects data for carousel
  const projectsData = [
    {
      id: 1,
      link: "https://docs.google.com/presentation/d/1A-Tu1BjCzNYnMJtxdG_280JBT6EBrDgG/edit?usp=drive_link&ouid=110348758768572062782&rtpof=true&sd=true",
      title: "Predictive Modeling of Diabetes Risk using Health Indicators",
      company: "Predictive Analytics for Business",
      description:
        "Utilized publicly available health data to build predictive models assessing individual risk for diabetes. This project leveraged the 2015 Behavioral Risk Factor Surveillance System (BRFSS) dataset from the CDC to explore health indicators and develop early detection tools. ",
      image:
        "https://cdn.analyticsvidhya.com/wp-content/uploads/2022/01/Diabetes-Prediction-Using-Machine-Learning.webp",
      tags: [
        "Data Preparation",
        "Data Exploration",
        "Model Development",
        "Machine Learning",
        "Feature Importance Analysis",
        "Linear Regression",
        "Logistic Regression",
        "KNN",
        "Decision Trees",
        "SVM",
      ],
      impact: "R, R Studio, Kaggle, Tableau",
    },
    {
      id: 1,
      link: "https://drive.google.com/file/d/11GX73FO7IZpSuv9dtR-KQjJ97xPGBco0/view?usp=drive_link",
      title: "Amazon Haul - Market Research & Product Strategy",
      company: "Corporate Information Planning",
      description:
        "Developed a strategic product roadmap for Amazon SkyHaul, a conceptual logistics and delivery enhancement initiative aimed at redefining last-mile efficiency and customer experience. The project integrated emerging technologies with market insights to shape a scalable, innovation-driven solution.",
      image:
        "https://image.cnbcfm.com/api/v1/image/108078551-1734649503100-site_Haul_Thumbnail.png?v=1734649575",
      tags: [
        "MVP",
        "Product Strategy",
        "Market Research",
        "Competitor Analysis",
        "Business Model Canvas",
        "Phased Tech Roadmap",
        "Revenue Modeling",
        "Strategic Partnerships",
        "Market Positioning",
        "Visual Strategy Assets"
      ],
      impact: "Canva, Figma, GenAI, Microsoft 365",
    },
    {
      id: 2,
      link: "https://drive.google.com/drive/folders/1XV9wfXHVvWxLNkQUb--_l1I0J1uPwMhL?usp=drive_link",
      title: "AR System Implementation at Artemis Logistics",
      company: "Project Management & Implementation",
      description:
        "Led the development of comprehensive project management documentation for a case study focused on implementing an Augmented Reality (AR) system at Artemis Logistics. The project aimed to enhance warehouse operations and inventory tracking through immersive, real-time data visualization.",
      image:
        "https://www.falconfulfillment.com/wp-content/uploads/2023/03/ff_logistics_001_misc_1920x1280.jpg",
      tags: [
        "Project Planning",
        "Budgeting",
        "Risk Management",
        "Resource Allocation",
        "GANTT Chart",
        "Work Breakdown Structure",
        "RACI Matrix",
        "PERT Chart"
      ],
      impact: "Figma, MS Project, Excel, LucidChart",
    },
    {
      id: 2,
      link: "https://drive.google.com/file/d/1n4_na2NXBXLqf-6zrYt_aBjmvxKx8tdO/view?usp=drive_link",
      title: "DeliverEase - Product Canvas",
      company: "System Analysis & Design",
      description:
        "Deliver Ease is a food delivery app that integrates major platforms like UberEats & GrubHub into a single interface. Mission is to optimize user experience by enabling real-time cost comparison, reducing wait times, and streamlining order tracking. The strategy focuses on enhancing customer satisfaction through predictive delivery insights, and personalized recommendations.",
      image:
        "https://tahinis.com/cdn/shop/articles/food_delivery.png?v=1653305107",
      tags: [
        "Product Market Fit Analysis",
        "User Personas",
        "Wireframing",
        "Pain Points Analysis",
        "UI / UX Design",
        "Features",
        "User Stories",
        "Points Estimation",
        "Roadmap",
        "Sprint Planning",
      ],
      impact: "Canva, LucidChart, Visio",
    },
    {
      id: 2,
      link: "https://drive.google.com/file/d/1KY_XuLk6buagdVge8fqUnn2QW9B5bK1y/view?usp=sharing",
      title: "Medallion Theater Booking System",
      company: "Flowchart and UML Diagrams",
      description:
        "Led the design and analysis of the Medallion Theater Booking System, focusing on modeling user interactions, system behavior, and core functionalities. Conducted a comprehensive workflow analysis to understand the end-to-end booking process, including ticket selection, seat reservation, payment processing, and confirmation. This project demonstrated my ability to translate business requirements into clear, structured system models that support scalable and user-friendly application design.",
      image:
        "https://i.pinimg.com/originals/86/5a/f9/865af99a0389c5cf41753ee143c75ea6.jpg",
      tags: [
        "Work Flow Analysis",
        "UML Diagrams",
        "Sequence Diagrams",
        " Class Diagram",
        "Use Case Diagram",
        "Flowcharts",
        ""
      ],
      impact: "Canva, LucidChart, Visio",
    },
    {
      id: 2,
      link: "https://drive.google.com/file/d/14Nh6I_M8tFo8As6rjV4NnPbpkvQ3UiCQ/view?usp=drive_link",
      title: "System Requirements Specification",
      company: "Project Request Proposal",
      description: "Acted as a systems analyst for a software consulting firm responding to a Request for Proposal (RFP) from *&* Publishing. Developed a comprehensive SRS document to serve as the SOW for the proposed solution. Successfully translated business needs into actionable technical documentation, ensuring alignment between client expectations and development execution.",
      image:
        "https://yuktisolutions.com/Content/Images/bigstock-Srs-Software-Requirements-Spec-395858375%20(1).jpg",
      tags: [
        "Project Charter",
        "System Specifications",
        "Request Proposal",
        "Technical Specifications",
        "Consulting Documentation",
        "Project Specification",
      ],
      impact: "Atlassian Confluence, MS Word",
    },
    {
      id: 2,
      title: "Point of Sale Migration & Optimization",
      company: "Data Management & Migration",
      description:
        "Enhanced a POS system by migrating data to a NoSQL database and implementing ETL processes using AWS EC2 and MariaDB, significantly improving scalability and query performance. Leveraged EC2 instances to manage data replication, sharding, backup automation, and high availability configurations, ensuring robust and efficient data handling across distributed environments.",
      image:
        "https://academy.invictus-ir.com/content-assets/public/eyJhbGciOiJIUzI1NiJ9.eyJvYmplY3Rfa2V5IjoiNTV3cDI0YWV6YnlzdWlmcjdia2Y3dHZvNTh6bCIsImRvbWFpbiI6ImFjYWRlbXkuaW52aWN0dXMtaXIuY29tIn0.DKgFrTwIh9UYw9GE34WA_ssHfPnzI-mhls6US7VLN3Q",
      tags: ["Data Management", "ETL", "Migration", "Replication", "Sharding", "Infrastructure Optimization", "Performance Gains", "High-Volume Transactional Environment"],
      impact: "SQL, MongoDB, AWC EC2 Instances",
    },

    {
      id: 2,
      title: "Penetration Testing & Risk Management in Healthcare",
      company: "Business Information Security",
      description:
        "Deployed Kali Linux and Metasploitable2 for penetration testing; leveraged tools such as Nmap, Unicornscan, for port scanning and OS fingerprinting. Additionally, performed CVE-based vulnerability assessments, PGP email encryption, and HIPAA-aligned risk evaluation of a healthcare system.",
      image:
        "https://news-cdn.softpedia.com/images/news2/kali-linux-2016-2-released-as-the-most-advanced-penetration-testing-distribution-507816-4.jpg",
      tags: [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Risk Analysis",
        "IT Risk Management Management",
        "Secure Communication",
        "Manage IT Risks",
        "HIPAA Frameworks",
        "CVE-based analysis"
      ],
      impact: "Kali, Metasploitable, NMAP",
    },
    {
      id: 1,
      title: "Publication: Social Distancing and Face Mask Detection using Deep Learning Model",
      company: "https://ieeexplore.ieee.org/abstract/document/9544890",
      link: "https://d1wqtxts1xzle7.cloudfront.net/108019684/45_1570753865_28577_EMr_15Jul22_16aug21_Ff-libre.pdf?1701250233=&response-content-disposition=inline%3B+filename%3DSocial_distance_and_face_mask_detector_s.pdf&Expires=1752559866&Signature=RVSn1IcgTt~g-sgS3GopgCArqKlgCov85PYO0lFSLscOialAbXkH2elhoMZtUFTRdXdAmmkXRrJR3CbT6UP04miEJd0Eo6Hm7P~2capKdLC4pIpr-C9ouAwswsA0UxNrRG7ViWt1k~Gkc3Zj2Izk8C3MMlURV1hA7MBM-ya~toB8Y1YyobBcRYSQTwrZBja10BUzpGaHodeP-zs-wiQhd~S0DKrIEq8eRKqH8pJg8N6R3ZEesgJSjvCj2uGTiBImW4gZVl~IeSnLFjnSLjqASmt6uWoDeQd31WJ58qHMqHu~8t2WGSSoNQ9L2XIP11WaX4hYNi-gLLLyI6f1kx2yEw__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA",
      description:
        "Developed a Social Distancing and Face Mask Detection system using MobileNet V2 for mask detection and YOLOv4 for distance computation, achieving 99% accuracy with a dataset of over 4,000 images, trained on Google Colab. The research paper is published on IJECE, a scopus indexed Q2 Journal.",
      image:
        "https://www.nasddds.org/wp-content/smush-webp/2020/03/Coronavirus-COVID-19.jpg.webp",
      tags: [
        "MobileNetV2",
        "CNN",
        "YOLOv4",
        "Scopus Indexed Q2 Journal",
        "Research Paper IEEE"
      ],
      impact: "Final Year Project: 2020-21",
    },
  ];

  const nextProjectSlide = () => {
    setCurrentProjectIndex((prev) =>
      prev === projectsData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevProjectSlide = () => {
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projectsData.length - 1 : prev - 1,
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
      title: "Mentorship & Volunteering",
      description:
        "Actively mentoring young professionals and contributing to diversity initiatives in technology and business.",
      color: "from-navy to-soft-blue",
    },
    {
      icon: Mountain,
      title: "Hiking",
      description: "Exploring nature through hiking and trail activities.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: PaintRoller,
      title: "Art & Design",
      description:
        "Creating visually engaging and functional designs, blending creativity with usability principles in UI/UX projects.",
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
              Pooja Suresh's Portfolio
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
              src="https://media.licdn.com/dms/image/v2/D5603AQGl8_CkvubZMQ/profile-displayphoto-crop_800_800/B56ZhtbyCrH0AQ-/0/1754182658173?e=1758153600&v=beta&t=pl8zujEhanFhE81XTH_z7VRqnmc3qE_95NCXe9g9Dz4"
              alt="Pooja Suresh professional headshot"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/20 shadow-xl object-cover"
              data-testid="img-hero-profile"
            />

            <h1 className="text-5xl md:text-7xl font-inter font-bold text-white mb-6">
              Hello, I'm <span className="gradient-text">Pooja</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              From vision to value — I build programs that deliver.
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              My path spans software engineering, product/program management, and business strategy. At Micron’s Global Procurement COE I lead intelligent automation initiatives in the semiconductor supply chain; earlier at LTIMindtree I built test automation and reliability tooling for a leading omnichannel marketing tech client. I’m completing my MS in MIS at Texas A&M, and I love shipping practical, data-backed products that move organizations forward.
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
              Academic foundation and continuous learning through degrees &
              certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {educationData.map((edu) => (
              <Card
                key={edu.id}
                className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                {/* Text left, image right on md+; stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_360px]">
                  {/* LEFT: text/content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-soft-blue to-gold rounded-xl flex items-center justify-center">
                        {edu.type === "degree" ? (
                          <GraduationCap className="text-white w-6 h-6" />
                        ) : (
                          <Award className="text-white w-6 h-6" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-inter font-bold text-navy">{edu.title}</h3>
                        <p className="text-soft-blue font-semibold text-sm">{edu.institution}</p>
                      </div>
                      <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-semibold">
                        {edu.year}
                      </span>
                    </div>

                    <p className="text-warm-gray leading-relaxed mb-4 text-sm">{edu.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-navy/10 text-navy px-2 py-1 rounded-full text-xs skill-badge"
                          data-testid={`tag-education-${edu.id}-${i}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: image (fills the right column height) */}
                  <div className="hidden md:block">
                    <img
                      src={edu.image}
                      alt={`${edu.institution} campus or related imagery`}
                      className="w-full h-full object-cover"
                      data-testid={`img-education-${edu.id}`}
                    />
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
              Professional journey from software engineering to program
              management, driving digital transformation and business impact.
            </p>
          </div>

          <div className="space-y-8">
            {workExperienceData.map((work) => (
              <Card
                key={work.id}
                className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
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
                      <div
                        className={`w-3 h-3 rounded-full ${work.type === "current"
                            ? "bg-green-500"
                            : "bg-gray-400"
                          }`}
                      ></div>
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
              Showcasing impactful products and strategic initiatives that drive
              business transformation and innovation.
            </p>
          </div>

          {/* Projects Carousel */}
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentProjectIndex * 100}%)`,
                }}
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
                                {project.link ? (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure"
                                    aria-label={`Open project: ${project.title}`}
                                    data-testid={`link-project-${project.id}`}
                                    title={project.title}
                                  >
                                    {project.title}
                                  </a>
                                ) : (
                                  project.title
                                )}
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
                  className={`w-3 h-3 rounded-full transition-all ${index === currentProjectIndex
                      ? "bg-white scale-110 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"
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
                    <p className="text-warm-gray">pooja.adi2309@gmail.com</p>
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
                      <a
                        href="https://www.linkedin.com/in/pooja-suresh-79a6b2165/"
                        rel="noopener noreferrer"
                        className="text-current hover:underline"
                      >
                        linkedin.com/in/pooja-suresh
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-warm-gray text-sm leading-relaxed">
                  <strong className="text-navy">Open to:</strong> opportunities
                  in Program Management, Product, Project Management, and
                  Digital Transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-inter font-bold mb-2 text-center">
                Thanks for viewing my portfolio!
              </h3>
              <p className="text-white/80"></p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/pooja-suresh-79a6b2165/"
                className="text-white/80 hover:text-gold transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/pooja2309"
                className="text-white/80 hover:text-gold transition-colors"
                data-testid="link-footer-github"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>
              &copy; 2025 All rights reserved. | Designed with passion for
              innovation and impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
