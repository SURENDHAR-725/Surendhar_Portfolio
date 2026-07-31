import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, education, stats } from '../../data/portfolio';
import LogoLoop from '../ui/LogoLoop';
import {
  SiReact,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiPython,
  SiTensorflow,
  SiOpencv,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiGooglecolab,
} from 'react-icons/si';
import { FaJava, FaDatabase, FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

gsap.registerPlugin(ScrollTrigger);

const skillLogos = [
  { node: <FaJava style={{ color: '#f89820' }} />, title: 'Java' },
  { node: <SiPython style={{ color: '#3776AB' }} />, title: 'Python' },
  { node: <FaDatabase style={{ color: '#336791' }} />, title: 'SQL' },
  { node: <SiReact style={{ color: '#61DAFB' }} />, title: 'React' },
  { node: <SiTypescript style={{ color: '#3178C6' }} />, title: 'TypeScript' },
  { node: <SiHtml5 style={{ color: '#E34F26' }} />, title: 'HTML5' },
  { node: <SiCss style={{ color: '#1572B6' }} />, title: 'CSS3' },
  { node: <SiBootstrap style={{ color: '#7952B3' }} />, title: 'Bootstrap' },
  { node: <FaAws style={{ color: '#FF9900' }} />, title: 'AWS' },
  { node: <SiGit style={{ color: '#F05032' }} />, title: 'Git' },
  { node: <SiGithub style={{ color: '#ffffff' }} />, title: 'GitHub' },
  { node: <SiTensorflow style={{ color: '#FF6F00' }} />, title: 'TensorFlow' },
  { node: <SiOpencv style={{ color: '#5C3EE8' }} />, title: 'OpenCV' },
  { node: <SiFigma style={{ color: '#F24E1E' }} />, title: 'Figma' },
  { node: <VscVscode style={{ color: '#007ACC' }} />, title: 'VS Code' },
  { node: <SiPostman style={{ color: '#FF6C37' }} />, title: 'Postman' },
  { node: <SiGooglecolab style={{ color: '#F9AB00' }} />, title: 'Google Colab' },
];

function AnimatedCounter({ target, decimals = 0, suffix = '' }: { target: number; decimals: number; suffix: string }) {
    const [value, setValue] = useState(0);
    const [triggered, setTriggered] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered) {
                    setTriggered(true);
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: target, duration: 2.2, ease: 'power3.out',
                        onUpdate: () => setValue(obj.val),
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, triggered]);

    return (
        <span ref={ref}>
            {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}
        </span>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.about-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
            });
            gsap.fromTo('.about-image', { opacity: 0, x: -60, scale: 0.9 }, {
                opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-image', start: 'top 80%' },
            });
            gsap.fromTo('.about-text-content > *', { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
                scrollTrigger: { trigger: '.about-text-content', start: 'top 80%' },
            });
            gsap.fromTo('.stat-card-pro', { opacity: 0, y: 40, scale: 0.9 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)',
                scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ top: 0, right: 0, width: 400, height: 400, opacity: 0.1, filter: 'blur(100px)', background: 'radial-gradient(circle, #00D4FF, transparent)' }} />

            {/* Scrolling Skill Logos — full bleed */}
            <div className="about-logoloop-wrapper">
                <LogoLoop
                    logos={skillLogos}
                    speed={80}
                    direction="left"
                    logoHeight={36}
                    gap={48}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="var(--deep-navy)"
                    ariaLabel="Technology skills"
                />
            </div>

            <div className="section-container" style={{ maxWidth: 1200 }}>
                <div className="about-heading" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--electric-blue)' }}>Get to know me</p>
                    <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
                </div>

                {/* Content Grid */}
                <div className="about-grid">
                    {/* Image */}
                    <div className="about-image about-image-container">
                        <div style={{ position: 'relative' }}>
                            <div className="animate-pulse-glow" style={{ position: 'absolute', inset: '-1rem', borderRadius: '1.5rem', opacity: 0.5 }} />
                            <div className="about-image-box glass" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                <img
                                    src="/profile.png"
                                    alt="Surendhar K - Software Developer"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                                />
                            </div>
                            <div className="glass animate-float" style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', borderRadius: '1rem', padding: '0.75rem', animationDelay: '1s' }}>
                                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                            </div>
                            <div className="glass animate-float" style={{ position: 'absolute', top: '-1rem', left: '-1rem', borderRadius: '1rem', padding: '0.5rem 1rem', animationDelay: '2s' }}>
                                <p style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.6)' }}>Specialization</p>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--electric-blue)' }}>Cloud Computing</p>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="about-text-content">
                        <p className="about-bio">{personalInfo.bio}</p>

                        <div className="about-edu-card glass">
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '1.25rem' }}>🎓</span>
                                <div>
                                    <h3 className="about-edu-institution">{education.institution}</h3>
                                    <p className="about-edu-degree">{education.degree} — {education.specialization}</p>
                                </div>
                            </div>
                            <div className="about-edu-meta">
                                <span>📅 {education.period}</span>
                                <span>📍 {education.location}</span>
                                <span>📈 GPA: {education.gpa}/{education.gpaMax}</span>
                            </div>
                        </div>

                        <div className="about-traits">
                            {['Problem Solver', 'Team Player', 'Quick Learner', 'Cloud Enthusiast'].map((trait) => (
                                <span key={trait} className="about-trait glass">{trait}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="stat-card-pro" style={{ animationDelay: `${i * 0.1}s` }}>
                            {/* Gradient border effect */}
                            <div className="stat-card-pro-border" />
                            {/* Shimmer sweep */}
                            <div className="stat-card-pro-shimmer" />
                            {/* Content */}
                            <div className="stat-card-pro-inner">
                                <p className="stat-card-pro-value">
                                    <AnimatedCounter target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                                </p>
                                <p className="stat-card-pro-label">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
