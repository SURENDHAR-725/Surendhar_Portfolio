import { useCustomCursor } from '../../hooks/useCustomCursor';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function CustomCursor() {
    const { cursorRef, followerRef } = useCustomCursor();
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (isMobile) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#fff',
                }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(0, 212, 255, 0.5)',
                    transition: 'width 0.3s, height 0.3s',
                }}
            />
        </>
    );
}
