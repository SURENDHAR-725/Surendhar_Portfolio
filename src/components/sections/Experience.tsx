import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
    period: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    type: 'education' | 'experience' | 'certification';
    pdfUrl: string;
}

const timelineItems: TimelineItem[] = [
    {
        period: '2023 - 2027', title: 'B.E. Computer Science and Engineering', subtitle: 'R.M.D Engineering College',
        description: 'Specialization in Cloud Computing (Honors) with a focus on AWS, system design, and modern development. CGPA: 7.84/10.',
        icon: '🎓', color: '#00D4FF', type: 'education', pdfUrl: '',
    },
    {
        period: 'Nov 2024 – Jan 2025', title: 'Data Visualization Intern', subtitle: 'Infosys',
        description: 'Analyzed 10,000+ records and built interactive Power BI dashboards. Engineered predictive analysis reports reducing manual reporting time by 40%. Created 5+ KPI dashboards enabling faster decision-making.',
        icon: '💼', color: '#00FF88', type: 'experience', pdfUrl: '',
    },
    {
        period: '2024', title: 'AWS Certified Cloud Practitioner', subtitle: 'Amazon Web Services',
        description: 'Completed 90 days of AWS re/Start training through TNSDC covering cloud fundamentals, security, networking, and databases.',
        icon: '☁️', color: '#FF9900', type: 'certification', pdfUrl: '/certs/aws-cloud-practitioner.pdf',
    },
    {
        period: '2025', title: 'OCI Certified Generative AI Professional', subtitle: 'Oracle',
        description: 'Oracle Cloud Infrastructure 2025 certification covering LLMs, prompt engineering, RAG, and AI service deployment on OCI.',
        icon: '🔴', color: '#C74634', type: 'certification', pdfUrl: '/certs/oracle-genai-professional.pdf',
    },
    {
        period: '2025', title: 'OCI Certified AI Foundations Associate', subtitle: 'Oracle',
        description: 'Oracle Cloud Infrastructure AI Foundations covering machine learning concepts, OCI AI services, and cloud AI strategies.',
        icon: '🔴', color: '#C74634', type: 'certification', pdfUrl: '/certs/oracle-ai-foundations.pdf',
    },
    {
        period: '2025', title: 'OCI Certified Architect Associate', subtitle: 'Oracle',
        description: 'Oracle Cloud Infrastructure Architect Associate covering OCI architecture, networking, storage, compute, and security best practices.',
        icon: '🔴', color: '#C74634', type: 'certification', pdfUrl: '/certs/oracle-architect.pdf',
    },
    {
        period: '2025', title: 'Agentic AI Certified Foundations Associate', subtitle: 'Oracle',
        description: 'Covers agentic AI fundamentals, autonomous agent design, multi-agent orchestration, and AI workflow automation.',
        icon: '🤖', color: '#C74634', type: 'certification', pdfUrl: '/certs/oracle-agentic-ai.pdf',
    },
    {
        period: '2025', title: 'ServiceNow Certified System Administrator', subtitle: 'ServiceNow University',
        description: 'Expertise in ServiceNow platform administration including workflows, user management, and ITSM configuration.',
        icon: '⚙️', color: '#62D84E', type: 'certification', pdfUrl: '/certs/servicenow-csa.pdf',
    },
    {
        period: '2025', title: 'CIS-DF: CMDB and CSDM', subtitle: 'ServiceNow University',
        description: 'Certified Implementation Specialist covering CMDB governance, CSDM framework, service mapping, and data integrity best practices.',
        icon: '🗂️', color: '#62D84E', type: 'certification', pdfUrl: '/certs/servicenow-cis-df.pdf',
    },
    {
        period: '2024', title: 'Introduction to Linux', subtitle: 'The Linux Foundation',
        description: 'Proficiency in Linux system administration and open-source technologies.',
        icon: '🐧', color: '#FCC624', type: 'certification', pdfUrl: '/certs/linux-foundation.pdf',
    },
    {
        period: '2024', title: 'Cloud Computing', subtitle: 'NPTEL ELITE',
        description: 'NPTEL ELITE certification covering virtualization, cloud architecture, and deployment models.',
        icon: '🏅', color: '#1E88E5', type: 'certification', pdfUrl: '/certs/nptel-cloud-computing.pdf',
    },
    {
        period: '2024', title: 'Cloud Computing & Distributed Systems', subtitle: 'NPTEL ELITE',
        description: 'Covering distributed computing paradigms, MapReduce, cloud infrastructure, and scalability.',
        icon: '🏅', color: '#7C4DFF', type: 'certification', pdfUrl: '/certs/nptel-cloud-distributed.pdf',
    },
    {
        period: '2024', title: 'Programming in Java', subtitle: 'NPTEL ELITE',
        description: 'Certification in Java programming covering OOP, collections, multithreading, and advanced Java.',
        icon: '🏅', color: '#F4511E', type: 'certification', pdfUrl: '/certs/nptel-java.pdf',
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.exp-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
            });

            if (lineRef.current) {
                gsap.fromTo(lineRef.current, { scaleY: 0 }, {
                    scaleY: 1, duration: 1, ease: 'none',
                    scrollTrigger: { trigger: lineRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 1 },
                });
            }

            gsap.utils.toArray<HTMLDivElement>('.timeline-item').forEach((item) => {
                gsap.fromTo(item, { opacity: 0, y: 50 }, {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: item, start: 'top 85%' },
                });
            });

            gsap.utils.toArray<HTMLDivElement>('.timeline-dot').forEach((dot) => {
                gsap.fromTo(dot, { scale: 0 }, {
                    scale: 1, duration: 0.5, ease: 'back.out(2)',
                    scrollTrigger: { trigger: dot, start: 'top 85%' },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ top: '33%', right: 0, width: 400, height: 400, opacity: 0.1, filter: 'blur(100px)', background: 'radial-gradient(circle, #FF6B35, transparent)' }} />

            <div className="section-container" style={{ maxWidth: 700 }}>
                {/* Header - centered */}
                <div className="exp-heading" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--sunset-orange)' }}>My Journey</p>
                    <h2 className="section-title">Experience & <span className="gradient-text-warm">Education</span></h2>
                </div>

                {/* Centered Timeline */}
                <div className="timeline-container">
                    <div ref={lineRef} className="timeline-line"
                        style={{ background: 'linear-gradient(180deg, #00D4FF, #8B5CF6, #FF6B35, #1E88E5)' }} />

                    <div className="timeline-items">
                        {timelineItems.map((item, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div key={item.title + i} className="timeline-item">
                                    <div className="timeline-dot glass" style={{ boxShadow: `0 0 15px ${item.color}44` }}>
                                        <span>{item.icon}</span>
                                    </div>

                                    <div className={`timeline-card-wrapper ${isLeft ? 'left' : 'right'}`}>
                                        <div className="timeline-card glass">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', justifyContent: isLeft ? 'flex-start' : 'flex-end' }}>
                                                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', borderRadius: 9999, background: `${item.color}20`, color: item.color }}>
                                                    {item.type === 'education' ? '📚 Education' : item.type === 'experience' ? '💼 Experience' : '🏆 Certification'}
                                                </span>
                                            </div>
                                            <p className="timeline-period" style={{ textAlign: isLeft ? 'left' : 'right' }}>{item.period}</p>
                                            <h3 className="timeline-title" style={{ textAlign: isLeft ? 'left' : 'right' }}>{item.title}</h3>
                                            <p className="timeline-subtitle" style={{ color: item.color, textAlign: isLeft ? 'left' : 'right' }}>{item.subtitle}</p>
                                            <p className="timeline-desc" style={{ textAlign: isLeft ? 'left' : 'right' }}>{item.description}</p>
                                            {item.pdfUrl && (
                                                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end' }}>
                                                    <a
                                                        href={item.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                            fontSize: '0.7rem', padding: '0.3rem 0.75rem', borderRadius: 9999,
                                                            background: `${item.color}15`, color: item.color,
                                                            border: `1px solid ${item.color}40`,
                                                            textDecoration: 'none', transition: 'background 0.2s',
                                                        }}
                                                    >
                                                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        View Certificate
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
