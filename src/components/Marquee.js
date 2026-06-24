import './Marquee.css';

const TECHS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'REST APIs',
  'GraphQL', 'Tailwind CSS', 'Firebase', 'Vercel', 'AWS',
  'Figma', 'Stripe', 'WebSockets', 'D3.js', 'PostgreSQL',
];

export default function Marquee() {
  const items = [...TECHS, ...TECHS];
  return (
    <div className="marquee-outer">
      <div className="marquee-track">
        {items.map((tech, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
