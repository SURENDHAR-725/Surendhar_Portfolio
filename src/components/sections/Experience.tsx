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
    type: 'education' | 'certification';
}

const timelineItems: TimelineItem[] = [
    {
        period: '2023 - Present', title: 'B.E. Computer Science', subtitle: 'R.M.D Engineering College',
        description: 'Specialization in Cloud Computing with a focus on AWS, system design, and modern development. GPA: 7.91/10.',
        icon: '🎓', color: '#00D4FF', type: 'education',
    },
    {
        period: '2024', title: 'AWS re/Start Graduate', subtitle: 'Amazon Web Services',
        description: 'Comprehensive cloud skills training covering AWS fundamentals, security, networking, databases, and automation.',
        icon: '☁️', color: '#FF9900', type: 'certification',
    },
    {
        period: '2024', title: 'Cloud Computing Foundation', subtitle: 'Google Cloud',
        description: 'Foundation-level certification covering Google Cloud Platform services and cloud computing core concepts.',
        icon: '🌐', color: '#4285F4', type: 'certification',
    },
    {
        period: '2024', title: 'Linux Foundation Certification', subtitle: 'The Linux Foundation',
        description: 'Proficiency in Linux system administration and open-source technologies.',
        icon: '🐧', color: '#FCC624', type: 'certification',
    },
    {
        period: '2024', title: 'Cloud Computing', subtitle: 'NPTEL ELITE',
        description: 'NPTEL ELITE certification covering virtualization, cloud architecture, and deployment models.',
        icon: '🏅', color: '#1E88E5', type: 'certification',
    },
    {
        period: '2024', title: 'Cloud Computing & Distributed Systems', subtitle: 'NPTEL ELITE',
        description: 'Certification covering distributed computing paradigms, MapReduce, cloud infrastructure, and scalability.',
        icon: '🏅', color: '#7C4DFF', type: 'certification',
    },
    {
        period: '2024', title: 'Programming in Java', subtitle: 'NPTEL ELITE',
        description: 'Certification in Java programming covering OOP, collections, multithreading, and advanced Java.',
        icon: '🏅', color: '#F4511E', type: 'certification',
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
                                                    {item.type === 'education' ? '📚 Education' : '🏆 Certification'}
                                                </span>
                                            </div>
                                            <p className="timeline-period" style={{ textAlign: isLeft ? 'left' : 'right' }}>{item.period}</p>
                                            <h3 className="timeline-title" style={{ textAlign: isLeft ? 'left' : 'right' }}>{item.title}</h3>
                                            <p className="timeline-subtitle" style={{ color: item.color, textAlign: isLeft ? 'left' : 'right' }}>{item.subtitle}</p>
                                            <p className="timeline-desc" style={{ textAlign: isLeft ? 'left' : 'right' }}>{item.description}</p>
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
