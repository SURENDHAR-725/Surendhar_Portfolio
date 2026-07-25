import { useMemo } from 'react';

// Generate random stars with consistent positions
const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.floor(Math.random() * 2000),
            y: Math.floor(Math.random() * 2000),
        });
    }
    return stars;
};

export default function StarField() {
    // Memoize star positions so they don't regenerate on every render
    const stars1 = useMemo(() => generateStars(700), []);
    const stars2 = useMemo(() => generateStars(200), []);
    const stars3 = useMemo(() => generateStars(100), []);

    const stars1Shadow = stars1.map(s => `${s.x}px ${s.y}px #fff`).join(', ');
    const stars2Shadow = stars2.map(s => `${s.x}px ${s.y}px #fff`).join(', ');
    const stars3Shadow = stars3.map(s => `${s.x}px ${s.y}px #fff`).join(', ');

    return (
        <div className="starfield-container" aria-hidden="true">
            {/* Radial gradient base layer */}
            <div className="starfield-gradient" />
            {/* Animated stars */}
            <div id="stars" style={{ boxShadow: stars1Shadow }} />
            <div id="stars2" style={{ boxShadow: stars2Shadow }} />
            <div id="stars3" style={{ boxShadow: stars3Shadow }} />
        </div>
    );
}
