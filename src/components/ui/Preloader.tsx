import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const tl = gsap.timeline({
                onComplete: () => onComplete(),
            });

            tl.to(textRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
            });

            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
                delay: 0.2,
            });
        }
    }, [progress, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
            style={{ background: '#0a0f1c' }}
        >
            {/* Animated background gradient */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
                }}
            />

            {/* Name */}
            <span
                ref={textRef}
                className="font-heading text-4xl md:text-6xl font-bold gradient-text mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
                Surendhar K
            </span>

            {/* Progress bar */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #00D4FF, #8B5CF6, #00FF88)',
                    }}
                />
            </div>

            {/* Percentage */}
            <span
                className="mt-4 text-sm tracking-widest text-white/40"
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                {progress}%
            </span>
        </div>
    );
}
