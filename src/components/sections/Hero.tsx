import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../../data/portfolio';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);

    const skillIcons = [
        { icon: '☕', label: 'Java', x: '10%', y: '20%' },
        { icon: '☁️', label: 'AWS', x: '85%', y: '15%' },
        { icon: '⚛️', label: 'React', x: '5%', y: '75%' },
        { icon: '📊', label: 'Power BI', x: '90%', y: '70%' },
        { icon: '🐧', label: 'Linux', x: '15%', y: '50%' },
        { icon: '🐙', label: 'GitHub', x: '80%', y: '45%' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '+=0.8');

            if (ctaRef.current) {
                tl.fromTo(
                    Array.from(ctaRef.current.children),
                    { opacity: 0, y: 40, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
                    '-=0.4'
                );
            }

            if (iconsRef.current) {
                const children = Array.from(iconsRef.current.children);
                gsap.fromTo(children, { opacity: 0, scale: 0 }, {
                    opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1, 0.5)', delay: 1.2,
                });
                children.forEach((child, i) => {
                    gsap.to(child, { y: '+=20', duration: 2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }} />
                <div className="bg-orb" style={{ top: '25%', left: '25%', width: 400, height: 400, opacity: 0.2, filter: 'blur(120px)', background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
                <div className="bg-orb animate-float" style={{ bottom: '25%', right: '25%', width: 350, height: 350, opacity: 0.15, filter: 'blur(100px)', background: 'radial-gradient(circle, #00D4FF, transparent)', animationDelay: '3s' }} />
                <div className="bg-orb animate-float" style={{ top: '50%', left: '50%', width: 250, height: 250, opacity: 0.1, filter: 'blur(80px)', background: 'radial-gradient(circle, #00FF88, transparent)', animationDelay: '1.5s' }} />
            </div>

            {/* Floating Skill Icons */}
            <div ref={iconsRef} className="hero-floating-icons">
                {skillIcons.map((item, i) => (
                    <div key={i} className="absolute" style={{ left: item.x, top: item.y, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                        <span style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="hero-content">
                <p className="hero-greeting">Hello, I'm</p>

                <h1 className="hero-name gradient-text">
                    <TypeAnimation
                        sequence={[personalInfo.name]}
                        wrapper="span"
                        speed={60}
                        cursor={false}
                        repeat={0}
                    />
                </h1>

                <div ref={subtitleRef} className="hero-subtitle-wrap">
                    <TypeAnimation
                        sequence={['Software Developer', 2000, 'Cloud Computing Enthusiast', 2000, 'Problem Solver', 2000, 'SkillRack 1100+ Champion', 2000]}
                        wrapper="span"
                        speed={50}
                        className="hero-subtitle"
                        repeat={Infinity}
                    />
                </div>

                <div ref={ctaRef} className="hero-cta">
                    <a href={personalInfo.resumeUrl} className="hero-btn hero-btn-primary" data-cursor-hover>
                        <span style={{ position: 'relative', zIndex: 10 }}>Download Resume</span>
                        <svg style={{ width: 20, height: 20, position: 'relative', zIndex: 10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                    <a href="#projects" className="hero-btn hero-btn-secondary" data-cursor-hover>
                        <span style={{ position: 'relative', zIndex: 10 }}>View Projects</span>
                        <svg style={{ width: 20, height: 20, position: 'relative', zIndex: 10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll-indicator">
                <span style={{ fontSize: '0.625rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const }}>Scroll</span>
                <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: 16, background: 'white', animation: 'shimmer 1.5s ease-in-out infinite' }} />
                </div>
            </div>
        </section>
    );
}
