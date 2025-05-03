import { create } from "zustand"

// Enhanced job data with more details
const initialJobs = [
  {
    id: "1",
    title: "UI/UX Designer",
    category: "Design",
    company: "TechCorp",
    companyDescription: "Leading technology company focused on innovative solutions",
    location: "Remote",
    posted: "2 days ago",
    isNew: true,
    employmentType: "Full-time",
    experienceLevel: "Mid-level",
    salary: "$80,000 - $110,000",
    fileName: "ui-ux-designer-job-description.pdf",
    fileSize: "245 KB",
    description:
      "We're looking for a talented UI/UX designer to join our product team and help create beautiful, intuitive interfaces for our growing suite of web and mobile applications. The ideal candidate will have a strong portfolio demonstrating exceptional design skills and a user-centered approach.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Design flows, prototypes, and high-fidelity mockups for web and mobile applications",
      "Collaborate with product managers and engineers to define and implement innovative solutions",
      "Conduct user research and evaluate user feedback to improve the design",
      "Create and maintain design systems to ensure consistent user experiences",
      "Stay up-to-date with the latest UI/UX trends, tools, and technologies",
    ],
    requirements: [
      "3+ years of experience in UI/UX design for web and mobile applications",
      "Strong portfolio demonstrating exceptional design skills",
      "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
      "Experience with design systems and component libraries",
      "Understanding of user research methodologies and usability testing",
      "Excellent communication and collaboration skills",
      "Bachelor's degree in Design, HCI, or related field (or equivalent experience)",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements and unlimited PTO",
      "Professional development budget",
      "Home office stipend",
      "Regular team events and retreats",
    ],
  },
  {
    id: "2",
    title: "Frontend Developer",
    category: "Development",
    company: "WebSolutions",
    companyDescription: "Fast-growing web development agency with global clients",
    location: "New York, NY",
    posted: "1 week ago",
    isNew: false,
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$120,000 - $150,000",
    fileName: "frontend-developer-job-description.pdf",
    fileSize: "312 KB",
    description:
      "Join our team to build responsive, performant web applications using modern JavaScript frameworks. We're looking for a senior frontend developer who can lead projects, mentor junior developers, and deliver exceptional user experiences.",
    responsibilities: [
      "Develop new user-facing features using React.js and modern frontend technologies",
      "Build reusable components and libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers to integrate frontend and backend systems",
      "Mentor junior developers and provide technical leadership",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in JavaScript, including ES6+ features",
      "Experience with React.js and its ecosystem (Redux, Next.js, etc.)",
      "Knowledge of modern frontend build pipelines and tools",
      "Understanding of server-side rendering and its benefits",
      "Experience with responsive design and cross-browser compatibility",
      "Excellent problem-solving skills and attention to detail",
    ],
    benefits: [
      "Competitive salary and annual bonuses",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Modern office in downtown Manhattan",
    ],
  },
  {
    id: "3",
    title: "Marketing Specialist",
    category: "Marketing",
    company: "GrowthHackers",
    companyDescription: "Data-driven marketing agency specializing in growth strategies",
    location: "San Francisco, CA",
    posted: "3 days ago",
    isNew: true,
    employmentType: "Full-time",
    experienceLevel: "Entry to Mid-level",
    salary: "$65,000 - $85,000",
    description:
      "Help us develop and execute marketing strategies to drive user acquisition and engagement. We're looking for a creative and analytical marketing specialist to join our growing team.",
    responsibilities: [
      "Plan and execute marketing campaigns across various channels",
      "Analyze campaign performance and provide insights for optimization",
      "Create compelling content for social media, email, and other platforms",
      "Collaborate with design and product teams to ensure consistent messaging",
      "Monitor industry trends and competitor activities",
      "Manage marketing budget and track ROI for different initiatives",
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Experience with social media marketing, email campaigns, and content creation",
      "Familiarity with marketing analytics tools and data analysis",
      "Strong written and verbal communication skills",
      "Basic understanding of SEO principles",
      "Bachelor's degree in Marketing, Communications, or related field",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Comprehensive benefits package",
      "Flexible work schedule",
      "Professional development opportunities",
      "Collaborative and innovative work environment",
    ],
  },
  {
    id: "4",
    title: "Product Manager",
    category: "Product",
    company: "InnovateCo",
    companyDescription: "Innovation-focused tech company building next-generation products",
    location: "Austin, TX",
    posted: "Just now",
    isNew: true,
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$130,000 - $160,000",
    description:
      "Lead product development initiatives from conception to launch, working with cross-functional teams. We're seeking an experienced product manager to drive our product strategy and execution.",
    responsibilities: [
      "Define product vision, strategy, and roadmap based on market research and business objectives",
      "Gather and prioritize product requirements from stakeholders and user feedback",
      "Work closely with engineering, design, and marketing teams to deliver high-quality products",
      "Define success metrics and monitor product performance",
      "Conduct competitive analysis and stay updated on industry trends",
      "Present product plans and results to executive leadership",
    ],
    requirements: [
      "5+ years of experience in product management, preferably in tech companies",
      "Proven track record of successfully launching and growing products",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management abilities",
      "Experience with agile development methodologies",
      "Technical background or understanding of software development processes",
      "MBA or related degree preferred",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health benefits",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team building events",
      "Modern office with amenities",
    ],
  },
]

// Mock applicant data
const applicantData = {
  "1": [
    {
      id: "a1",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      message:
        "I have 5 years of experience in UI/UX design and have worked with major tech companies. I specialize in creating intuitive user interfaces and have a strong portfolio of successful projects.",
      cv: "jane-smith-cv.pdf",
      appliedDate: "2 days ago",
      status: "reviewed",
      cvRating: 4.5,
      skillsMatch: 85,
      experienceMatch: 90,
      educationMatch: 80,
      missingKeywords: 2,
      yearsOfExperience: 5,
      skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      id: "a2",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "(555) 987-6543",
      location: "Chicago, IL",
      message:
        "I specialize in user research and have a portfolio of successful design projects. My background in psychology helps me create user-centered designs that drive engagement and satisfaction.",
      cv: "mike-johnson-cv.pdf",
      appliedDate: "3 days ago",
      status: "pending",
      cvRating: 3.5,
      skillsMatch: 70,
      experienceMatch: 65,
      educationMatch: 85,
      missingKeywords: 4,
      yearsOfExperience: 3,
      skills: ["User Research", "Sketch", "InVision", "Information Architecture", "Usability Testing"],
    },
    {
      id: "a3",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "(555) 456-7890",
      location: "Remote",
      message:
        "I'm a UI/UX designer with 7 years of experience creating digital products for startups and enterprise companies. I have a strong focus on accessibility and inclusive design principles.",
      cv: "sarah-williams-cv.pdf",
      appliedDate: "1 day ago",
      status: "reviewed",
      cvRating: 5.0,
      skillsMatch: 95,
      experienceMatch: 95,
      educationMatch: 90,
      missingKeywords: 0,
      yearsOfExperience: 7,
      skills: ["Figma", "Adobe XD", "Design Systems", "Accessibility", "User Testing", "Prototyping", "UI Animation"],
    },
  ],
  "2": [
    {
      id: "a4",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      phone: "(555) 234-5678",
      location: "New York, NY",
      message:
        "I'm proficient in React, Next.js, and have 3 years of experience building responsive web applications. I'm passionate about creating performant and accessible web experiences.",
      cv: "alex-chen-cv.pdf",
      appliedDate: "5 days ago",
      status: "reviewed",
      cvRating: 4.0,
      skillsMatch: 80,
      experienceMatch: 75,
      educationMatch: 85,
      missingKeywords: 3,
      yearsOfExperience: 3,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "Responsive Design"],
    },
    {
      id: "a5",
      name: "Taylor Rodriguez",
      email: "taylor.rodriguez@example.com",
      phone: "(555) 876-5432",
      location: "Austin, TX",
      message:
        "Senior frontend developer with 6 years of experience specializing in React and modern JavaScript frameworks. I have a track record of building high-performance web applications and mentoring junior developers.",
      cv: "taylor-rodriguez-cv.pdf",
      appliedDate: "2 days ago",
      status: "pending",
      cvRating: 4.8,
      skillsMatch: 90,
      experienceMatch: 95,
      educationMatch: 80,
      missingKeywords: 1,
      yearsOfExperience: 6,
      skills: ["React", "Redux", "Next.js", "TypeScript", "GraphQL", "Webpack", "Performance Optimization"],
    },
  ],
  "3": [],
  "4": [
    {
      id: "a6",
      name: "Jordan Lee",
      email: "jordan.lee@example.com",
      phone: "(555) 345-6789",
      location: "Seattle, WA",
      message:
        "Product manager with 8 years of experience in tech companies. I've successfully launched multiple products from concept to market, with a focus on user-centered design and data-driven decision making.",
      cv: "jordan-lee-cv.pdf",
      appliedDate: "Just now",
      status: "pending",
      cvRating: 4.7,
      skillsMatch: 85,
      experienceMatch: 90,
      educationMatch: 95,
      missingKeywords: 1,
      yearsOfExperience: 8,
      skills: ["Product Strategy", "User Research", "Agile", "Roadmapping", "Analytics", "Stakeholder Management"],
    },
  ],
}

type Job = {
  id: string
  title: string
  category: string
  company: string
  companyDescription: string
  location: string
  posted: string
  isNew?: boolean
  employmentType: string
  experienceLevel: string
  salary?: string
  fileName?: string
  fileSize?: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits?: string[]
}

type Applicant = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  message: string
  cv: string
  appliedDate: string
  status: "reviewed" | "pending"
  cvRating: number
  skillsMatch: number
  experienceMatch: number
  educationMatch: number
  missingKeywords: number
  yearsOfExperience: number
  skills: string[]
}

type JobStore = {
  jobs: Job[]
  postedJobs: {
    id: string
    title: string
    fileName?: string
    fileSize?: string
    applicantCount?: number
  }[]
  addJob: (job: any) => void
  getJobApplicants: (jobId: string) => Applicant[]
}

// Initial posted jobs data with applicant counts
const initialPostedJobs = [
  {
    id: "1",
    title: "UI/UX Designer",
    fileName: "ui-ux-designer-job-description.pdf",
    fileSize: "245 KB",
    applicantCount: 3,
  },
  {
    id: "2",
    title: "Frontend Developer",
    fileName: "frontend-developer-job-description.pdf",
    fileSize: "312 KB",
    applicantCount: 2,
  },
  {
    id: "3",
    title: "Marketing Specialist",
    fileName: "marketing-specialist-job-description.pdf",
    fileSize: "198 KB",
    applicantCount: 0,
  },
  {
    id: "4",
    title: "Product Manager",
    fileName: "product-manager-job-description.pdf",
    fileSize: "275 KB",
    applicantCount: 1,
  },
]

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: initialJobs,
  postedJobs: initialPostedJobs,
  addJob: (job) =>
    set((state) => ({
      postedJobs: [
        ...state.postedJobs,
        {
          ...job,
          applicantCount: 0,
        },
      ],
    })),
  getJobApplicants: (jobId: string) => {
    return applicantData[jobId] || []
  },
}))
