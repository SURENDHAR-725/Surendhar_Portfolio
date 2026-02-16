import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications, achievements } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
    const [flipped, setFlipped] = useState(false);
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

    return (
        <div ref={cardRef} className="cert-card-container"
            onClick={() => setFlipped(!flipped)} onMouseLeave={() => setFlipped(false)} data-cursor-hover>
            <div className={`cert-card-inner ${flipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="cert-card-face glass" style={{ borderColor: `${cert.color}30` }}>
                    <div className="cert-icon-box" style={{ background: `${cert.color}15`, boxShadow: `0 0 30px ${cert.color}20` }}>
                        {cert.icon}
                    </div>
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer" style={{ color: cert.color }}>{cert.issuer}</p>
                    <p className="cert-hint">Click to learn more →</p>
                </div>
                {/* Back */}
                <div className="cert-card-face cert-card-back glass" style={{ borderColor: `${cert.color}30` }}>
                    <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cert.icon}</span>
                    <p className="cert-back-desc">{cert.description}</p>
                    <div className="cert-verified-badge" style={{ background: `${cert.color}20`, color: cert.color }}>
                        Verified ✓
                    </div>
                </div>
            </div>
        </div>
    );
}

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
