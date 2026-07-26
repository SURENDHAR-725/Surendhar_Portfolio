import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications, achievements } from '../../data/portfolio';
import * as pdfjsLib from 'pdfjs-dist';

gsap.registerPlugin(ScrollTrigger);

// Set up the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString();

// ── PDF Image Renderer ────────────────────────────────────────────────────────
function PdfCertImage({ pdfUrl, color }: { pdfUrl: string; color: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const renderTaskRef = useRef<{ cancelled: boolean } | null>(null);

    useEffect(() => {
        if (!pdfUrl) {
            setError(true);
            return;
        }

        // Cancel any previous render
        if (renderTaskRef.current) {
            renderTaskRef.current.cancelled = true;
        }
        const task = { cancelled: false };
        renderTaskRef.current = task;

        let loadingTask: ReturnType<typeof pdfjsLib.getDocument> | null = null;

        const doRender = async () => {
            try {
                loadingTask = pdfjsLib.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;
                if (task.cancelled) return;

                const page = await pdf.getPage(1);
                if (task.cancelled) return;

                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Render at 1.5x for sharpness while keeping performance
                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderTask = page.render({
                    canvas,
                    canvasContext: ctx,
                    viewport,
                });

                await renderTask.promise;
                if (!task.cancelled) {
                    setLoaded(true);
                }
            } catch (err) {
                if (!task.cancelled) {
                    console.error('PDF render error:', err);
                    setError(true);
                }
            }
        };

        doRender();

        return () => {
            task.cancelled = true;
            if (loadingTask) {
                loadingTask.destroy();
            }
        };
    }, [pdfUrl]);

    if (error || !pdfUrl) {
        return (
            <div className="cert-img-placeholder" style={{ background: `${color}10` }}>
                <span style={{ fontSize: '3rem' }}>📜</span>
            </div>
        );
    }

    return (
        <div className={`cert-img-wrapper ${loaded ? 'loaded' : ''}`}>
            <canvas ref={canvasRef} className="cert-pdf-canvas" />
            {!loaded && (
                <div className="cert-img-loading" style={{ borderColor: `${color}40` }}>
                    <div className="cert-loading-spinner" style={{ borderTopColor: color }} />
                </div>
            )}
        </div>
    );
}

// ── Certificate Card ──────────────────────────────────────────────────────────
function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
    const [flipped, setFlipped] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current!, { opacity: 0, y: 60, rotateX: 15 }, {
                opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', delay: index * 0.1,
                scrollTrigger: { trigger: cardRef.current!, start: 'top 85%' },
            });
        });
        return () => ctx.revert();
    }, [index]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || flipped) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -14;
        const rotateY = ((x - centerX) / centerX) * 14;
        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
        setFlipped(false);
    };

    return (
        <div
            ref={cardRef}
            className={`cert-card-container ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setFlipped(!flipped)}
            data-cursor-hover
        >
            <div
                className={`cert-card-inner ${flipped ? 'flipped' : ''}`}
                style={{
                    transform: flipped
                        ? 'rotateY(180deg)'
                        : isHovered
                        ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(15px)`
                        : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                    transition: isHovered && !flipped ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                {/* Front - Certificate Image */}
                <div
                    className="cert-card-face glass"
                    style={{
                        borderColor: isHovered ? `${cert.color}80` : `${cert.color}30`,
                        boxShadow: isHovered
                            ? `0 22px 50px -15px rgba(0, 0, 0, 0.75), 0 0 35px -5px ${cert.color}45, inset 0 0 20px ${cert.color}15`
                            : `0 10px 30px -15px rgba(0, 0, 0, 0.5), 0 0 15px -5px ${cert.color}20`,
                    }}
                >
                    {/* Gloss sheen overlay */}
                    <div className="cert-card-sheen" />

                    <div className="cert-card-image-area" style={{ transform: 'translateZ(35px)' }}>
                        {cert.imageUrl ? (
                            <div className="cert-img-wrapper loaded">
                                <img src={cert.imageUrl} alt={cert.title} className="cert-pdf-canvas" style={{ objectFit: 'contain', padding: '0.25rem' }} />
                            </div>
                        ) : (
                            <PdfCertImage pdfUrl={cert.pdfUrl} color={cert.color} />
                        )}
                    </div>

                    <div className="cert-card-info" style={{ transform: 'translateZ(45px)' }}>
                        <h3 className="cert-title">{cert.title}</h3>
                        <p className="cert-issuer" style={{ color: cert.color }}>{cert.issuer}</p>
                    </div>

                    <p className="cert-hint" style={{ transform: 'translateZ(38px)' }}>Click to view details 🔄</p>
                </div>

                {/* Back */}
                <div
                    className="cert-card-face cert-card-back glass"
                    style={{
                        borderColor: `${cert.color}60`,
                        boxShadow: `0 22px 50px -15px rgba(0, 0, 0, 0.8), 0 0 35px -5px ${cert.color}35`,
                    }}
                >
                    <div className="cert-card-back-content" style={{ transform: 'translateZ(35px)' }}>
                        <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'inline-block' }}>{cert.icon}</span>
                        <p className="cert-back-desc">{cert.description}</p>
                        <div className="cert-verified-badge" style={{ background: `${cert.color}25`, color: cert.color, borderColor: `${cert.color}40` }}>
                            Verified ✓
                        </div>
                        {(cert.pdfUrl || cert.imageUrl) && (
                            <a
                                href={cert.imageUrl || cert.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="cert-view-btn"
                                style={{
                                    marginTop: '0.85rem',
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    fontSize: '0.75rem', padding: '0.45rem 1.1rem', borderRadius: 9999,
                                    background: `${cert.color}25`, color: cert.color,
                                    border: `1px solid ${cert.color}60`,
                                    textDecoration: 'none', fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 4px 15px ${cert.color}25`,
                                }}
                            >
                                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Certificate
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cert-heading', { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: { trigger: '.cert-heading', start: 'top 85%' },
            });
            gsap.fromTo('.achievement-item', { opacity: 0, y: 30, scale: 0.9 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
                scrollTrigger: { trigger: '.achievements-bar', start: 'top 85%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="certifications" className="section-padding relative overflow-hidden">
            <div className="bg-orb" style={{ bottom: 0, left: '33%', width: 400, height: 400, opacity: 0.1, filter: 'blur(100px)', background: 'radial-gradient(circle, #FF9900, transparent)' }} />

            <div className="section-container" style={{ maxWidth: 1100 }}>
                {/* Header */}
                <div className="cert-heading" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: 'var(--sunset-orange)' }}>Achievements</p>
                    <h2 className="section-title">Certifications & <span className="gradient-text-warm">Awards</span></h2>
                </div>

                {/* Achievement highlight bar */}
                <div className="achievements-bar glass">
                    <div className="achievements-grid">
                        {achievements.map((item) => (
                            <div key={item.title} className="achievement-item">
                                <span className="achievement-icon">{item.icon}</span>
                                <span className="achievement-value gradient-text">{item.value}</span>
                                <span className="achievement-title">{item.title}</span>
                                <span className="achievement-desc">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications grid */}
                <div className="certs-grid">
                    {certifications.map((cert, i) => (
                        <CertCard key={cert.title} cert={cert} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
