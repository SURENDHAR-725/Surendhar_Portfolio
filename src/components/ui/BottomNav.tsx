import { useState, useEffect } from 'react';
import Dock from './Dock';
import type { DockItemData } from './Dock';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const CodeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const RocketIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const AwardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

// ── Section config ────────────────────────────────────────────────────────────
const sections = [
    { id: 'hero', label: 'Home', icon: <HomeIcon /> },
    { id: 'about', label: 'About', icon: <UserIcon /> },
    { id: 'skills', label: 'Skills', icon: <CodeIcon /> },
    { id: 'experience', label: 'Experience', icon: <BriefcaseIcon /> },
    { id: 'projects', label: 'Projects', icon: <RocketIcon /> },
    { id: 'certifications', label: 'Certs', icon: <AwardIcon /> },
    { id: 'contact', label: 'Contact', icon: <MailIcon /> },
];

// ── Scroll to section helper ──────────────────────────────────────────────────
function scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BottomNav() {
    const [visible, setVisible] = useState(false);

    // Show/hide based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Build dock items from sections
    const dockItems: DockItemData[] = sections.map(section => ({
        icon: section.icon,
        label: section.label,
        onClick: () => scrollToSection(section.id),
    }));

    return (
        <nav className={`bottom-dock-wrapper ${visible ? 'bottom-dock--visible' : ''}`}>
            <Dock
                items={dockItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />
        </nav>
    );
}
