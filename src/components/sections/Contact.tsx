import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
            });
            gsap.fromTo('.contact-info > *', { opacity: 0, x: -40 }, {
                opacity: 1, x: 0, duration: 0.6, stagger: 0.1,
                scrollTrigger: { trigger: '.contact-info', start: 'top 80%' },
            });
            gsap.fromTo('.contact-form', { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormState({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    const contactItems = [
        { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
        { icon: '📱', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
        { icon: '📍', label: 'Location', value: personalInfo.location, href: '#' },
    ];

    return (
        <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ top: 0, left: '25%', width: 500, height: 500, opacity: 0.1, filter: 'blur(120px)', background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />

            <div className="section-container" style={{ maxWidth: 1000 }}>
                {/* Header */}
                <div className="contact-heading" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--vibrant-purple)' }}>Let's connect</p>
                    <h2 className="section-title">Get in <span className="gradient-text">Touch</span></h2>
                </div>

                <div className="contact-grid">
                    {/* Info */}
                    <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p className="contact-info-text">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                        <div className="contact-items">
                            {contactItems.map((item) => (
                                <a key={item.label} href={item.href} className="contact-item glass" data-cursor-hover>
                                    <span className="contact-item-icon">{item.icon}</span>
                                    <div>
                                        <p className="contact-item-label">{item.label}</p>
                                        <p className="contact-item-value">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="social-links">
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link glass" data-cursor-hover title="LinkedIn">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link glass" data-cursor-hover title="GitHub">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="contact-form glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="contact-form-grid">
                            <div>
                                <label className="form-label">Name</label>
                                <input type="text" required value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="form-input" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="form-label">Email</label>
                                <input type="email" required value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="form-input" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Subject</label>
                            <input type="text" required value={formState.subject}
                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                className="form-input" placeholder="Project Collaboration" />
                        </div>
                        <div>
                            <label className="form-label">Message</label>
                            <textarea required rows={4} value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="form-input" placeholder="Tell me about your project..." />
                        </div>
                        <button type="submit" disabled={status === 'sending'} className="form-submit" data-cursor-hover>
                            {status === 'idle' && 'Send Message ✨'}
                            {status === 'sending' && (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 1s linear infinite' }} />
                                    Sending...
                                </span>
                            )}
                            {status === 'success' && '✓ Message Sent!'}
                            {status === 'error' && '✕ Something went wrong'}
                        </button>
                        {status === 'success' && (
                            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--neon-green)', animation: 'pulse-glow 2s ease infinite' }}>
                                Thank you! I'll get back to you soon 🚀
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="footer-divider" />
                <p className="footer-copyright">
                    © {new Date().getFullYear()} <span className="gradient-text" style={{ fontWeight: 500 }}>Surendhar K</span>. All rights reserved.
                </p>
                <p className="footer-tech">Built with React, TypeScript, GSAP & ❤️</p>
            </div>
        </section>
    );
}
