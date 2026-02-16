import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

function SkillCard({ skill }: { skill: { name: string; level: number; icon: string; color: string } }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(cardRef.current, { rotateY: x * 20, rotateX: -y * 20, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        setIsHovered(false);
        gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    useEffect(() => {
        if (!progressRef.current) return;
        gsap.fromTo(progressRef.current, { width: '0%' }, {
            width: `${skill.level}%`, duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: progressRef.current, start: 'top 90%' },
        });
    }, [skill.level]);

    return (
        <div ref={cardRef} className="skill-card glass"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            data-cursor-hover>
            <div className="skill-info">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar">
                <div ref={progressRef} className="skill-bar-fill"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                        boxShadow: isHovered ? `0 0 10px ${skill.color}44` : 'none',
                    }} />
            </div>
        </div>
    );
}

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.skills-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
            });
            gsap.utils.toArray<HTMLElement>('.skill-category').forEach((el) => {
                gsap.fromTo(el, { opacity: 0, y: 60 }, {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ bottom: 0, left: 0, width: 500, height: 500, opacity: 0.1, filter: 'blur(120px)', background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />

            <div className="section-container" style={{ maxWidth: 1000 }}>
                <div className="skills-heading" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--vibrant-purple)' }}>What I know</p>
                    <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
                </div>

                <div className="skills-categories">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="skill-category">
                            <div className="skill-category-title">
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: category.color }} />
                                <h3>{category.title}</h3>
                            </div>
                            <div className="skills-grid">
                                {category.skills.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
