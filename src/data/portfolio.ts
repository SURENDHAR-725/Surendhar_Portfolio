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
    bio: "Passionate software developer with a strong foundation in cloud computing, backend development, and modern web technologies. Currently pursuing B.E. in Computer Science with a Cloud Computing specialization at R.M.D Engineering College.",
    resumeUrl: "/resume.pdf",
};

export const education = {
    institution: "R.M.D Engineering College",
    degree: "B.E. in Computer Science",
    specialization: "Cloud Computing",
    period: "2023 - Present",
    gpa: "7.91",
    gpaMax: "10",
    location: "Chennai, India",
};

export const stats = [
    { label: "GPA", value: 7.91, suffix: "/10", decimals: 2 },
    { label: "Projects", value: 3, suffix: "+", decimals: 0 },
    { label: "Certifications", value: 6, suffix: "+", decimals: 0 },
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
            { name: "C", level: 70, icon: "⚙️", color: "#A8B9CC" },
            { name: "JavaScript", level: 75, icon: "🟨", color: "#F7DF1E" },
            { name: "TypeScript", level: 70, icon: "🔷", color: "#3178C6" },
        ],
    },
    {
        title: "AWS Services",
        color: "#FF9900",
        skills: [
            { name: "AWS EC2", level: 80, icon: "🖥️", color: "#FF9900" },
            { name: "AWS S3", level: 80, icon: "🪣", color: "#569A31" },
            { name: "AWS Lambda", level: 75, icon: "⚡", color: "#FF9900" },
            { name: "AWS DynamoDB", level: 70, icon: "📋", color: "#4053D6" },
            { name: "AWS API Gateway", level: 70, icon: "🌐", color: "#FF4F8B" },
            { name: "AWS CloudFormation", level: 65, icon: "🏗️", color: "#FF9900" },
            { name: "AWS IAM", level: 75, icon: "🔐", color: "#DD344C" },
            { name: "AWS VPC", level: 70, icon: "🔒", color: "#8C4FFF" },
        ],
    },
    {
        title: "Cloud & DevOps",
        color: "#8B5CF6",
        skills: [
            { name: "AWS", level: 80, icon: "☁️", color: "#FF9900" },
            { name: "Google Cloud", level: 65, icon: "🌐", color: "#4285F4" },
            { name: "Linux", level: 80, icon: "🐧", color: "#FCC624" },
            { name: "Git", level: 85, icon: "📦", color: "#F05032" },
            { name: "GitHub", level: 85, icon: "🐙", color: "#fff" },
        ],
    },
    {
        title: "Tools & Frameworks",
        color: "#00FF88",
        skills: [
            { name: "React", level: 75, icon: "⚛️", color: "#61DAFB" },
            { name: "Power BI", level: 70, icon: "📊", color: "#F2C811" },
            { name: "Windows", level: 85, icon: "🪟", color: "#0078D6" },
            { name: "VS Code", level: 90, icon: "💻", color: "#007ACC" },
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
    github?: string;
    live?: string;
}

export const projects: Project[] = [
    {
        id: "ai-quiz-builder",
        title: "AI Quiz Builder",
        description: "Interactive quiz platform powered by AI-generated questions with real-time multiplayer support.",
        longDescription:
            "A comprehensive quiz platform featuring AI-generated questions using the NVIDIA API, real-time multiplayer buzzer games with WebSocket support, and advanced session management.",
        techStack: ["React", "TypeScript", "Supabase", "NVIDIA API", "WebSocket"],
        category: "Web Development",
        github: "https://github.com/SURENDHAR-725",
        featured: true,
        color: "#00D4FF",
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
    },
    {
        id: "aws-meeting-organizer",
        title: "AWS Meeting Organizer",
        description: "Serverless event management platform built on AWS for community meetups and workshops.",
        longDescription:
            "A cloud-native event management platform leveraging AWS services including Lambda, DynamoDB, and API Gateway.",
        techStack: ["AWS Lambda", "DynamoDB", "API Gateway", "S3", "CloudFormation"],
        category: "Cloud",
        github: "https://github.com/SURENDHAR-725",
        featured: true,
        color: "#FF6B35",
    },
];

export const projectCategories = ["All", "Web Development", "Data Science", "Cloud"];

export interface Certification {
    title: string;
    issuer: string;
    icon: string;
    color: string;
    description: string;
}

export const certifications: Certification[] = [
    {
        title: "AWS re/Start Graduate",
        issuer: "Amazon Web Services",
        icon: "☁️",
        color: "#FF9900",
        description: "Comprehensive cloud skills training program covering AWS Cloud fundamentals, security, networking, and databases.",
    },
    {
        title: "Cloud Computing Foundation",
        issuer: "Google Cloud",
        icon: "🌐",
        color: "#4285F4",
        description: "Foundation-level certification in Google Cloud Platform services and cloud computing concepts.",
    },
    {
        title: "Linux Foundation Certification",
        issuer: "The Linux Foundation",
        icon: "🐧",
        color: "#FCC624",
        description: "Certification validating proficiency in Linux system administration and open-source technologies.",
    },
    {
        title: "Cloud Computing",
        issuer: "NPTEL ELITE",
        icon: "🏅",
        color: "#1E88E5",
        description: "NPTEL ELITE certification in Cloud Computing covering virtualization, cloud architecture, and deployment models.",
    },
    {
        title: "Cloud Computing & Distributed Systems",
        issuer: "NPTEL ELITE",
        icon: "🏅",
        color: "#7C4DFF",
        description: "NPTEL ELITE certification covering distributed computing paradigms, MapReduce, cloud infrastructure, and scalability.",
    },
    {
        title: "Programming in Java",
        issuer: "NPTEL ELITE",
        icon: "🏅",
        color: "#F4511E",
        description: "NPTEL ELITE certification in Java programming covering OOP, collections, multithreading, and advanced Java concepts.",
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
        value: "6x",
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
        value: "7.91",
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
