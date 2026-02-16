import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!barRef.current) return;

        gsap.to(barRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[999]">
            <div
                ref={barRef}
                className="h-full origin-left"
                style={{
                    transform: 'scaleX(0)',
                    background: 'linear-gradient(90deg, #00D4FF, #8B5CF6, #00FF88, #FF6B35)',
                }}
            />
        </div>
    );
}
