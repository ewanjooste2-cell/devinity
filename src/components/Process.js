import { useEffect, useRef, useState } from 'react';
import './Process.css';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your goals, users, and constraints. A short call is all it takes to map out what we\'re building and why.',
    tags: ['Requirements', 'Scoping', 'Timeline'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'We translate requirements into wireframes and high-fidelity mockups — reviewed with you before a single line of code is written.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Build',
    description: 'Clean, tested React code shipped in weekly sprints. You get visibility into progress at every stage — no black boxes.',
    tags: ['React', 'TypeScript', 'Code Review'],
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We deploy, configure CI/CD, and hand over documentation. Post-launch support is included for 30 days as standard.',
    tags: ['Deployment', 'CI/CD', 'Handover'],
  },
];

function StepCard({ step, index }) {
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
      className={`process-step ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="step-number">{step.number}</div>
      <div className="step-connector" />
      <div className="step-body">
        <h3 className="step-title">{step.title}</h3>
        <p className="step-desc">{step.description}</p>
        <div className="step-tags">
          {step.tags.map(tag => (
            <span key={tag} className="step-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="container">
        <div className="section-header">
          <p className="section-label">// how we work</p>
          <h2 className="section-title">From Idea to Live App<br />in Four Steps</h2>
          <p className="section-subtitle">
            A proven process that keeps projects on track, on budget, and free of surprises.
          </p>
        </div>
        <div className="process-grid">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
