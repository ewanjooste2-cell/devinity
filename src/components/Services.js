import { useEffect, useRef, useState } from 'react';
import './Services.css';

const services = [
  {
    icon: '⚛️',
    title: 'React Development',
    description: 'Scalable, component-driven React apps built with modern patterns — hooks, context, code splitting, and optimized rendering.',
    tags: ['React 19', 'Next.js', 'TypeScript'],
  },
  {
    icon: '📱',
    title: 'Web App Development',
    description: 'Full-featured web applications with rich UIs, real-time data, authentication, and seamless API integration.',
    tags: ['REST APIs', 'WebSockets', 'Auth'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design & Build',
    description: 'Pixel-perfect interfaces built from Figma or from scratch — responsive, accessible, and performance-optimised.',
    tags: ['Figma', 'Responsive', 'A11y'],
  },
  {
    icon: '⚡',
    title: 'Performance Optimisation',
    description: 'Audit and tune your existing React app for speed — bundle size, lazy loading, memoisation, and Core Web Vitals.',
    tags: ['Lighthouse', 'Bundle Analysis', 'CWV'],
  },
  {
    icon: '🔧',
    title: 'API & Backend Integration',
    description: 'Connect your frontend to any backend — REST, GraphQL, third-party services, and headless CMS platforms.',
    tags: ['GraphQL', 'Node.js', 'Headless CMS'],
  },
  {
    icon: '🚀',
    title: 'Deployment & DevOps',
    description: 'CI/CD pipelines, cloud hosting setup, and infrastructure configuration so your app ships reliably every time.',
    tags: ['Vercel', 'AWS', 'GitHub Actions'],
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`service-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      <div className="service-tags">
        {service.tags.map(tag => (
          <span key={tag} className="service-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-header">
          <p className="section-label">// what we do</p>
          <h2 className="section-title">Everything You Need<br />to Ship Great Software</h2>
          <p className="section-subtitle">
            From a single-page landing to a complex full-stack web app — we've got the React expertise to get it done.
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
