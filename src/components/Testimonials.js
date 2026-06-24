import { useEffect, useRef, useState } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Devinity took our messy prototype and turned it into a polished, production-ready app in six weeks. The code quality and attention to detail were exceptional.",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "FinTrack",
    initials: "SM",
    accent: '#00d4ff',
  },
  {
    quote: "We'd worked with three dev agencies before Devinity. None of them communicated as clearly or delivered as consistently. They're our go-to React team now.",
    name: "James Okonkwo",
    role: "CTO",
    company: "ShopForge",
    initials: "JO",
    accent: '#7c3aed',
  },
  {
    quote: "From the first call to launch day, the process was completely transparent. No surprises on scope, no missed deadlines. Exactly what a startup needs.",
    name: "Priya Naidoo",
    role: "Product Lead",
    company: "Collab Hub",
    initials: "PN",
    accent: '#10d9a0',
  },
];

function StarRating() {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`testimonial-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms`, '--t-accent': t.accent }}
    >
      <StarRating />
      <p className="testimonial-quote">"{t.quote}"</p>
      <div className="testimonial-author">
        <div className="author-avatar" style={{ background: `${t.accent}22`, border: `1px solid ${t.accent}44`, color: t.accent }}>
          {t.initials}
        </div>
        <div className="author-info">
          <span className="author-name">{t.name}</span>
          <span className="author-role">{t.role} · {t.company}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-label">// client feedback</p>
          <h2 className="section-title">Trusted by Founders<br />& Product Teams</h2>
          <p className="section-subtitle">
            Don't take our word for it — here's what our clients say after working with us.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
