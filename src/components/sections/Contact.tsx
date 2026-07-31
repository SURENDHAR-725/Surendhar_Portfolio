import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data/portfolio';
import { LampContainer } from '../ui/lamp';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedKeyboard from '../ui/AnimatedKeyboard';
import { playMacbookClickSound } from '../../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const keyboardContainerRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [focusedField, setFocusedField] = useState<'name' | 'email' | 'subject' | 'message'>('name');
    const [activeKey, setActiveKey] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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

    // Close keyboard when clicking anywhere outside keyboard container, form inputs, or toggle button
    useEffect(() => {
        if (!showKeyboard) return;

        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node;
            if (
                keyboardContainerRef.current && !keyboardContainerRef.current.contains(target) &&
                formRef.current && !formRef.current.contains(target) &&
                toggleButtonRef.current && !toggleButtonRef.current.contains(target)
            ) {
                setShowKeyboard(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showKeyboard]);

    // Listen for physical keyboard key presses to trigger key lighting animation & sound effect
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Avoid duplicate sound if typing modifier keys repeatedly or meta
            if (e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Meta') {
                playMacbookClickSound(e.key);
            }
            setActiveKey(e.key);
            setTimeout(() => {
                setActiveKey(null);
            }, 200);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleVirtualKeyPress = (char: string) => {
        setActiveKey(char);
        setTimeout(() => setActiveKey(null), 200);

        setFormState((prev) => {
            const currentVal = prev[focusedField];
            if (char === 'Backspace') {
                return { ...prev, [focusedField]: currentVal.slice(0, -1) };
            }
            if (char === 'Enter') {
                return { ...prev, [focusedField]: currentVal + '\n' };
            }
            if (char === 'Tab' || char === 'Shift') {
                return prev;
            }
            return { ...prev, [focusedField]: currentVal + char };
        });
    };

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
        <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden pt-0">
            <div className="bg-orb" style={{ top: 0, left: '25%', width: 500, height: 500, opacity: 0.1, filter: 'blur(120px)', background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />

            {/* Lamp Section Header */}
            <LampContainer className="mb-[-2rem]">
                <motion.div
                    initial={{ opacity: 0.5, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="contact-heading text-center"
                >
                    <p className="section-label" style={{ color: 'var(--electric-blue)' }}>Let's connect</p>
                    <h2 className="section-title text-4xl md:text-6xl font-bold tracking-tight">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    
                    {/* Start Typing Button */}
                    <motion.div 
                        className="mt-6 flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            ref={toggleButtonRef}
                            type="button"
                            onClick={() => setShowKeyboard((prev) => !prev)}
                            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 border border-cyan-500/40 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/25 active:scale-95"
                        >
                            <span className="text-lg transition-transform duration-300 group-hover:rotate-12">⌨️</span>
                            <span>{showKeyboard ? 'Hide Keyboard' : 'Start Typing'}</span>
                            <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                        </button>
                    </motion.div>
                </motion.div>
            </LampContainer>

            {/* Animated Interactive Keyboard Drawer */}
            <AnimatePresence>
                {showKeyboard && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mb-12 flex flex-col items-center justify-center px-4"
                    >
                        <div ref={keyboardContainerRef} className="w-full max-w-4xl rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-4 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 relative">
                            <div className="flex items-center justify-between px-3 pb-3 border-b border-white/10 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block h-3 w-3 rounded-full bg-red-500/80" />
                                    <span className="inline-block h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <span className="inline-block h-3 w-3 rounded-full bg-green-500/80" />
                                    <span className="ml-2 text-xs font-mono text-cyan-300/80">Interactive RGB Keyboard — Click or type to write in form ({focusedField.toUpperCase()})</span>
                                </div>
                                <button
                                    onClick={() => setShowKeyboard(false)}
                                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
                                >
                                    ✕ Close
                                </button>
                            </div>
                            <AnimatedKeyboard onKeyPress={handleVirtualKeyPress} activeKey={activeKey} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="section-container" style={{ maxWidth: 1000 }}>
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
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="contact-form-grid">
                            <div>
                                <label className="form-label">Name</label>
                                <input type="text" required value={formState.name}
                                    onFocus={() => { setFocusedField('name'); setShowKeyboard(true); }}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="form-input" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="form-label">Email</label>
                                <input type="email" required value={formState.email}
                                    onFocus={() => { setFocusedField('email'); setShowKeyboard(true); }}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="form-input" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Subject</label>
                            <input type="text" required value={formState.subject}
                                onFocus={() => { setFocusedField('subject'); setShowKeyboard(true); }}
                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                className="form-input" placeholder="Project Collaboration" />
                        </div>
                        <div>
                            <label className="form-label">Message</label>
                            <textarea required rows={4} value={formState.message}
                                onFocus={() => { setFocusedField('message'); setShowKeyboard(true); }}
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

