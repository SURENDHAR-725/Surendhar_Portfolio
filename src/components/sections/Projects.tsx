import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/portfolio';
import type { Project } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// ── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({
    project,
    isActive,
    onMouseEnter,
}: {
    project: Project;
    isActive: boolean;
    onMouseEnter: () => void;
}) {
    return (
        <div
            className="project-accordion-item"
            style={{
                width: isActive ? '480px' : '72px',
                minWidth: isActive ? '480px' : '72px',
                flexShrink: 0,
            }}
            onMouseEnter={onMouseEnter}
        >
            {/* Background image */}
            <img
                src={project.imageUrl}
                alt={project.title}
                className="project-accordion-img"
                onError={(e) => {
                    (e.target as HTMLImageElement).src =
                        'https://placehold.co/480x500/0d1224/ffffff?text=Project';
                }}
            />

            {/* Dark + color overlay */}
            <div
                className="project-accordion-overlay"
                style={{
                    background: isActive
                        ? `linear-gradient(to top, ${project.color}cc 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)`
                        : 'rgba(0,0,0,0.55)',
                }}
            />

            {/* Gradient border glow on active */}
            {isActive && (
                <div
                    className="project-accordion-glow"
                    style={{ boxShadow: `0 0 0 2px ${project.color}80, 0 0 40px ${project.color}30` }}
                />
            )}

            {/* Vertical label (inactive) */}
            {!isActive && (
                <span className="project-accordion-label-vert">
                    {project.title}
                </span>
            )}

            {/* Active panel content */}
            {isActive && (
                <div className="project-accordion-content">
                    {/* Category badge */}
                    <span
                        className="project-accordion-badge"
                        style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}50` }}
                    >
                        {project.category}
                    </span>

                    <h3 className="project-accordion-title">{project.title}</h3>
                    <p className="project-accordion-desc">{project.description}</p>

                    {/* Tech pills */}
                    <div className="project-accordion-tech">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="project-accordion-pill">{tech}</span>
                        ))}
                    </div>

                    {/* GitHub link */}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-accordion-btn"
                            style={{ borderColor: `${project.color}60`, color: project.color }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.projects-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' },
            });
            gsap.fromTo('.project-accordion-item', { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: '.project-accordion-wrap', start: 'top 85%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, opacity: 0.08, filter: 'blur(120px)', background: 'radial-gradient(circle, #00FF88, transparent)' }} />

            <div className="section-container" style={{ maxWidth: 1200 }}>
                {/* Header */}
                <div className="projects-heading" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--neon-green)' }}>What I've built</p>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Hover over a project to explore
                    </p>
                </div>

                {/* Accordion */}
                <div className="project-accordion-wrap">
                    {projects.map((project, index) => (
                        <AccordionItem
                            key={project.id}
                            project={project}
                            isActive={index === activeIndex}
                            onMouseEnter={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
