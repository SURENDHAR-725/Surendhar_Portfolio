import { useState, useRef, useEffect } from 'react';
import { navLinks } from '../../data/portfolio';
import gsap from 'gsap';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen && menuRef.current) {
            gsap.fromTo(menuRef.current.children,
                { x: 60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? 'glass-strong scrolled' : ''}`}>
            <div className="navbar-inner">
                {/* Logo */}
                <a href="#hero" className="navbar-logo gradient-text" data-cursor-hover>SK.</a>

                {/* Desktop Links */}
                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <button key={link.href} onClick={() => handleNavClick(link.href)}
                            className="navbar-link" data-cursor-hover>
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button className={`hamburger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)} data-cursor-hover aria-label="Toggle menu">
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div ref={menuRef} className="mobile-menu glass-strong">
                    {navLinks.map((link) => (
                        <button key={link.href} onClick={() => handleNavClick(link.href)} className="mobile-link">
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
