import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';

const projects = [
  {
    title: 'FinTrack Dashboard',
    category: 'Web App',
    description: 'Real-time financial analytics dashboard with live chart updates, custom filters, and multi-user auth.',
    tags: ['React', 'Node.js', 'WebSockets', 'Recharts'],
    accent: '#00d4ff',
    lines: ['const { data } = useRealtime("/api/portfolio");', 'return <Dashboard metrics={data} />;'],
  },
  {
    title: 'ShopForge',
    category: 'E-Commerce',
    description: 'High-performance e-commerce storefront with server-side rendering, cart state, and payment integration.',
    tags: ['Next.js', 'Stripe', 'Sanity CMS', 'Tailwind'],
    accent: '#7c3aed',
    lines: ['export async function getStaticProps() {', '  return { props: await getProducts() };'],
  },
  {
    title: 'Collab Hub',
    category: 'SaaS Platform',
    description: 'Team collaboration tool with live document editing, presence indicators, and workspace management.',
    tags: ['React', 'Firebase', 'CRDT', 'TypeScript'],
    accent: '#10d9a0',
    lines: ['const [presence] = usePresence(roomId);', 'const doc = useDocument(docId);'],
  },
  {
    title: 'DataViz Studio',
    category: 'Data Tool',
    description: 'Drag-and-drop chart builder that connects to any API and generates shareable interactive visualisations.',
    tags: ['React', 'D3.js', 'REST APIs', 'Canvas'],
    accent: '#f59e0b',
    lines: ['const chart = buildChart(config, dataset);', 'canvas.render(chart, { animated: true });'],
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`project-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms`, '--card-accent': project.accent }}
    >
      <div className="project-preview">
        <div className="preview-bar">
          <span className="bar-dot" style={{ background: '#ff5f57' }} />
          <span className="bar-dot" style={{ background: '#febc2e' }} />
          <span className="bar-dot" style={{ background: '#28c840' }} />
          <span className="bar-title">{project.title.toLowerCase().replace(' ', '-')}.jsx</span>
        </div>
        <div className="preview-code">
          {project.lines.map((line, i) => (
            <div key={i} className="code-line">
              <span className="line-num">{i + 1}</span>
              <span className="line-text">{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <div className="section-header">
          <p className="section-label">// our work</p>
          <h2 className="section-title">Projects We're Proud Of</h2>
          <p className="section-subtitle">
            A selection of apps and products we've designed and built from the ground up.
          </p>
        </div>
        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
        <div className="portfolio-cta">
          <p>Have a project in mind?</p>
          <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Let's Build It
          </button>
        </div>
      </div>
    </section>
  );
}
