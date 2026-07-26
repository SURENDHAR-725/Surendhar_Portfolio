import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Create Lenis instance for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Connect Lenis scroll events to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Drive Lenis via GSAP ticker for consistent frame timing
        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        // Also drive Lenis via requestAnimationFrame as a fallback
        // This ensures smooth scrolling works even if GSAP ticker behaves
        // differently across browsers
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Delayed ScrollTrigger refresh to ensure all components have mounted
        // and trigger positions are correctly computed
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            clearTimeout(refreshTimeout);
            cancelAnimationFrame(rafId);
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}
