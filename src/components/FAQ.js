import { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects run between 4 and 12 weeks depending on scope. A landing page or marketing site takes 2–4 weeks. A full web app with auth, database, and dashboard typically takes 8–12 weeks. We\'ll give you a detailed timeline after our first call.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Just a clear brief — what you\'re building, who it\'s for, and your rough timeline and budget. If you have designs or a Figma file, great. If not, we can handle design too. We keep the process simple.',
  },
  {
    q: 'Do you work with startups or only established businesses?',
    a: 'Both. We\'ve built MVPs for early-stage startups and scaled platforms for established businesses. We adapt our process to your stage — lean and fast for startups, structured and documented for larger teams.',
  },
  {
    q: 'Can you take over an existing React project?',
    a: 'Yes. We do code audits, refactors, and feature additions on existing codebases regularly. Send us the repo and we\'ll give you an honest assessment before committing to anything.',
  },
  {
    q: 'What happens after the project is delivered?',
    a: '30 days of post-launch support is included as standard — bug fixes, minor tweaks, and questions. After that, we offer retainer packages for ongoing development and maintenance.',
  },
  {
    q: 'How do payments work?',
    a: 'We work on a 50/50 split — 50% upfront to begin, 50% on final delivery. For larger projects we break it into milestones. All pricing is quoted in ZAR and invoiced through a formal agreement.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open) setHeight(bodyRef.current.scrollHeight);
    else setHeight(0);
  }, [open]);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="faq-q-text">{faq.q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-body" style={{ height }} ref={bodyRef}>
        <p className="faq-answer">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="faq section" id="faq" ref={ref}>
      <div className="container">
        <div className="faq-inner">
          <div className={`faq-header ${visible ? 'visible' : ''}`}>
            <p className="section-label">&#47;&#47; common questions</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Frequently Asked<br />
              <span style={{ color: 'var(--accent)' }}>Questions</span>
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0' }}>
              Everything you need to know before starting a project with us.
            </p>
          </div>
          <div className={`faq-list ${visible ? 'visible' : ''}`}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
