import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, projectCategories } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects =
        activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.projects-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' },
            });
            gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
                gsap.fromTo(card, { opacity: 0, y: 60 }, {
                    opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 88%' },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [filteredProjects]);

    const projectEmoji = (id: string) => {
        if (id === 'ai-quiz-builder') return '🧠';
        if (id === 'retail-sales-forecasting') return '📈';
        return '☁️';
    };

    return (
        <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, opacity: 0.1, filter: 'blur(120px)', background: 'radial-gradient(circle, #00FF88, transparent)' }} />

            <div className="section-container" style={{ maxWidth: 1100 }}>
                {/* Header */}
                <div className="projects-heading" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--neon-green)' }}>What I've built</p>
                    <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                        Featured <span className="gradient-text">Projects</span>
                    </h2>

                    <div className="projects-filter">
                        {projectCategories.map((category) => (
                            <button key={category} onClick={() => setActiveCategory(category)}
                                className={`projects-filter-btn ${activeCategory === category ? 'active' : ''}`}
                                data-cursor-hover>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project grid */}
                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="project-card glass" style={{ borderColor: `${project.color}20` }}>
                            <div className="project-image">
                                <div className="project-image-bg"
                                    style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span className="project-emoji">{projectEmoji(project.id)}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{project.category}</span>
                                    </div>
                                </div>
                                {project.featured && (
                                    <div className="glass" style={{ position: 'absolute', top: 12, right: 12, padding: '0.25rem 0.75rem', borderRadius: 9999 }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--neon-green)' }}>⭐ Featured</span>
                                    </div>
                                )}
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>

                                <div className="project-tech">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="project-tech-pill">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-actions">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                                            className="project-github-btn glass" data-cursor-hover>
                                            <svg style={{ width: 16, height: 16 }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
