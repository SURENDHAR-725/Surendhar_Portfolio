import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface CursorState {
    x: number;
    y: number;
}

export function useCustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const pos = useRef<CursorState>({ x: 0, y: 0 });

    const onMouseMove = useCallback((e: MouseEvent) => {
        pos.current = { x: e.clientX, y: e.clientY };

        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
        }

        if (followerRef.current) {
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    }, []);

    const onMouseEnterInteractive = useCallback(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 });
        }
        if (followerRef.current) {
            gsap.to(followerRef.current, { scale: 2, duration: 0.3, opacity: 0.5 });
        }
    }, []);

    const onMouseLeaveInteractive = useCallback(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        }
        if (followerRef.current) {
            gsap.to(followerRef.current, { scale: 1, duration: 0.3, opacity: 1 });
        }
    }, []);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        window.addEventListener('mousemove', onMouseMove);

        const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnterInteractive);
            el.addEventListener('mouseleave', onMouseLeaveInteractive);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
        };
    }, [onMouseMove, onMouseEnterInteractive, onMouseLeaveInteractive]);

    return { cursorRef, followerRef };
}
