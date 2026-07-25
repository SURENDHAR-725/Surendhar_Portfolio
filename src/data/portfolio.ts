export const personalInfo = {
    name: "Surendhar K",
    firstName: "Surendhar",
    lastName: "K",
    title: "Software Developer",
    subtitle: "Cloud Computing Enthusiast",
    location: "Chennai, India",
    email: "ksurendhar725@gmail.com",
    phone: "+91 9597887626",
    linkedin: "https://linkedin.com/in/surendhar-k",
    github: "https://github.com/SURENDHAR-725",
    bio: "Final-year Computer Science undergraduate with hands-on experience in AI-powered applications, scalable software systems, and cloud technologies. Strong foundation in Java, software engineering, and full-stack development, with a passion for building reliable and high-performance applications that solve real-world problems.",
    resumeUrl: "/resume.pdf",
};

export const education = {
    institution: "R.M.D Engineering College",
    degree: "B.E. in Computer Science and Engineering",
    specialization: "Cloud Computing (Honors)",
    period: "2023 - 2027",
    gpa: "7.84",
    gpaMax: "10",
    location: "Chennai, India",
};

export const stats = [
    { label: "GPA", value: 7.84, suffix: "/10", decimals: 2 },
    { label: "Projects", value: 3, suffix: "+", decimals: 0 },
    { label: "Certifications", value: 12, suffix: "+", decimals: 0 },
    { label: "SkillRack Problems", value: 1100, suffix: "+", decimals: 0 },
];

export interface Skill {
    name: string;
    level: number;
    icon: string;
    color: string;
}

export interface SkillCategory {
    title: string;
    color: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Programming Languages",
        color: "#00D4FF",
        skills: [
            { name: "Java", level: 85, icon: "☕", color: "#f89820" },
            { name: "SQL", level: 80, icon: "🗄️", color: "#336791" },
            { name: "Python", level: 75, icon: "🐍", color: "#3776AB" },
        ],
    },
    {
        title: "Development",
        color: "#FF6B35",
        skills: [
            { name: "React", level: 80, icon: "⚛️", color: "#61DAFB" },
            { name: "TypeScript", level: 75, icon: "🔷", color: "#3178C6" },
            { name: "HTML", level: 85, icon: "🌐", color: "#E34F26" },
            { name: "CSS", level: 80, icon: "🎨", color: "#1572B6" },
            { name: "Bootstrap", level: 75, icon: "🅱️", color: "#7952B3" },
        ],
    },
    {
        title: "Tools",
        color: "#00FF88",
        skills: [
            { name: "AWS Services", level: 80, icon: "☁️", color: "#FF9900" },
            { name: "Power BI", level: 75, icon: "📊", color: "#F2C811" },
            { name: "Git", level: 85, icon: "📦", color: "#F05032" },
            { name: "GitHub", level: 85, icon: "🐙", color: "#ffffff" },
            { name: "Postman", level: 75, icon: "📮", color: "#FF6C37" },
            { name: "Figma", level: 65, icon: "🎭", color: "#F24E1E" },
            { name: "Google Colab", level: 70, icon: "🔬", color: "#F9AB00" },
            { name: "VS Code", level: 90, icon: "💻", color: "#007ACC" },
        ],
    },
    {
        title: "Machine Learning",
        color: "#8B5CF6",
        skills: [
            { name: "TensorFlow", level: 70, icon: "🧠", color: "#FF6F00" },
            { name: "OpenCV", level: 70, icon: "👁️", color: "#5C3EE8" },
            { name: "Tesseract OCR", level: 65, icon: "🔍", color: "#00B4D8" },
        ],
    },
];

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    techStack: string[];
    category: string;
    featured: boolean;
    color: string;
    imageUrl: string;
    github?: string;
    live?: string;
}

export const projects: Project[] = [
    {
        id: "ai-interview-platform",
        title: "AI-Powered Interview Platform",
        description: "Real-time voice-based AI interview platform with LLM-driven evaluation, speech-to-text, and authentication.",
        longDescription:
            "Designed and developed an AI-powered interview platform using React, TypeScript, Supabase Realtime, and serverless APIs, enabling real-time voice-based interviews. Implemented LLM-driven interview logic, speech-to-text processing, and authentication.",
        techStack: ["React", "TypeScript", "Supabase", "Netlify Functions", "REST APIs", "PDF.js"],
        category: "Web Development",
        github: "https://github.com/SURENDHAR-725",
        featured: true,
        color: "#00D4FF",
        imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "retail-sales-forecasting",
        title: "Retail Sales Forecasting",
        description: "ML-based sales prediction system with interactive data visualizations and Power BI dashboards.",
        longDescription:
            "A machine learning solution for predicting retail sales trends using historical data with interactive Power BI dashboards.",
        techStack: ["Python", "scikit-learn", "Power BI", "Pandas", "NumPy"],
        category: "Data Science",
        github: "https://github.com/SURENDHAR-725",
        featured: true,
        color: "#8B5CF6",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "microplastic-detection",
        title: "Portable Microplastic Detection",
        description: "Portable UV-illuminated imaging system with TinyML-based classification for real-time microplastic detection.",
        longDescription:
            "Designed a portable UV-illuminated imaging system with controlled water flow. Implemented ESP32-CAM firmware with TinyML-based image classification to detect and classify microplastics in real time.",
        techStack: ["OpenCV", "TensorFlow", "ESP32-CAM", "TinyML", "USB Microscope", "UV LED"],
        category: "Machine Learning",
        github: "https://github.com/SURENDHAR-725",
        featured: true,
        color: "#00FF88",
        imageUrl: "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop",
    },
];

export const projectCategories = ["All", "Web Development", "Data Science", "Machine Learning"];

export interface Certification {
    title: string;
    issuer: string;
    icon: string;
    color: string;
    description: string;
    pdfUrl: string;
    imageUrl?: string;
}

export const certifications: Certification[] = [
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        icon: "☁️",
        color: "#FF9900",
        description: "Completed 90 days of AWS re/Start training through TNSDC, earning the AWS Certified Cloud Practitioner certification covering cloud fundamentals, security, networking, and databases.",
        pdfUrl: "/certs/aws-cloud-practitioner.pdf",
    },
    {
        title: "Google Cloud Engineering Certificate",
        issuer: "Google Cloud",
        icon: "🌐",
        color: "#4285F4",
        description: "Foundation-level certification in Google Cloud Platform services and cloud computing core concepts.",
        pdfUrl: "",
        imageUrl: "/certs/google-cloud-engineering.png",
    },
    {
        title: "Introduction to Linux",
        issuer: "The Linux Foundation",
        icon: "🐧",
        color: "#FCC624",
        description: "Certification validating proficiency in Linux system administration and open-source technologies.",
        pdfUrl: "/certs/linux-foundation.pdf",
    },
    {
        title: "OCI 2025 Certified Generative AI Professional",
        issuer: "Oracle",
        icon: "🔴",
        color: "#C74634",
        description: "Oracle Cloud Infrastructure 2025 certification in Generative AI covering LLMs, prompt engineering, RAG, and AI service deployment on OCI.",
        pdfUrl: "/certs/oracle-genai-professional.pdf",
    },
    {
        title: "OCI 2025 Certified AI Foundations Associate",
        issuer: "Oracle",
        icon: "🔴",
        color: "#C74634",
        description: "Oracle Cloud Infrastructure 2025 AI Foundations certification covering machine learning concepts, OCI AI services, and cloud AI strategies.",
        pdfUrl: "/certs/oracle-ai-foundations.pdf",
    },
    {
        title: "OCI 2025 Certified Architect Associate",
        issuer: "Oracle",
        icon: "🔴",
        color: "#C74634",
        description: "Oracle Cloud Infrastructure 2025 Architect Associate certification covering OCI architecture, networking, storage, compute, and security.",
        pdfUrl: "/certs/oracle-architect.pdf",
    },
    {
        title: "Agentic AI Certified Foundations Associate",
        issuer: "Oracle",
        icon: "🤖",
        color: "#C74634",
        description: "Oracle certification covering agentic AI fundamentals, autonomous agent design, multi-agent orchestration, and AI workflow automation.",
        pdfUrl: "/certs/oracle-agentic-ai.pdf",
    },
    {
        title: "ServiceNow Certified System Administrator",
        issuer: "ServiceNow University",
        icon: "⚙️",
        color: "#62D84E",
        description: "Certification validating expertise in ServiceNow platform administration including workflows, user management, and ITSM configuration.",
        pdfUrl: "/certs/servicenow-csa.pdf",
    },
    {
        title: "CIS-DF: CMDB and CSDM",
        issuer: "ServiceNow University",
        icon: "🗂️",
        color: "#62D84E",
        description: "Certified Implementation Specialist in Data Foundations covering CMDB governance, CSDM framework, service mapping, and data integrity best practices.",
        pdfUrl: "/certs/servicenow-cis-df.pdf",
    },
    {
        title: "Cloud Computing",
        issuer: "NPTEL ELITE",
        icon: "🏅",
        color: "#1E88E5",
        description: "NPTEL ELITE certification in Cloud Computing covering virtualization, cloud architecture, and deployment models.",
        pdfUrl: "/certs/nptel-cloud-computing.pdf",
    },
    {
        title: "Cloud Computing & Distributed Systems",
        issuer: "NPTEL ELITE",
        icon: "🏅",
        color: "#7C4DFF",
        description: "NPTEL ELITE certification covering distributed computing paradigms, MapReduce, cloud infrastructure, and scalability.",
        pdfUrl: "/certs/nptel-cloud-distributed.pdf",
    },
    {
        title: "Programming in Java",
        issuer: "NPTEL ELITE",
        icon: "🏅",
        color: "#F4511E",
        description: "NPTEL ELITE certification in Java programming covering OOP, collections, multithreading, and advanced Java concepts.",
        pdfUrl: "/certs/nptel-java.pdf",
    },
    {
        title: "Principle of Management",
        issuer: "NPTEL",
        icon: "🏅",
        color: "#9C27B0",
        description: "NPTEL certification covering management principles, organizational behavior, leadership, planning, and decision-making.",
        pdfUrl: "/certs/nptel-management.pdf",
    },
];

export const achievements = [
    {
        icon: "🏆",
        title: "SkillRack Champion",
        value: "1100+",
        description: "Problems solved on SkillRack platform",
    },
    {
        icon: "☁️",
        title: "Cloud Certified",
        value: "12x",
        description: "Industry-recognized cloud certifications",
    },
    {
        icon: "💡",
        title: "Projects Built",
        value: "3+",
        description: "End-to-end project implementations",
    },
    {
        icon: "🎯",
        title: "Academic GPA",
        value: "7.84",
        description: "Consistent academic performance",
    },
];

export const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];
