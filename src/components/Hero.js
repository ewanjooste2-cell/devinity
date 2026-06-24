import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const TYPED_WORDS = ['React Apps.', 'Web Platforms.', 'SaaS Products.', 'Digital Experiences.'];

function TypedWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPED_WORDS[wordIndex];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPED_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="hero-typed">
      {displayed}<span className="hero-cursor">|</span>
    </span>
  );
}

const CODE_TOKENS = [
  { text: 'const', color: '#c678dd' },
  { text: 'import', color: '#c678dd' },
  { text: 'export', color: '#c678dd' },
  { text: 'return', color: '#c678dd' },
  { text: 'function', color: '#c678dd' },
  { text: 'default', color: '#c678dd' },
  { text: 'async', color: '#c678dd' },
  { text: 'await', color: '#c678dd' },
  { text: 'useState', color: '#61afef' },
  { text: 'useEffect', color: '#61afef' },
  { text: 'useRef', color: '#61afef' },
  { text: 'useCallback', color: '#61afef' },
  { text: 'useMemo', color: '#61afef' },
  { text: 'useContext', color: '#61afef' },
  { text: 'React', color: '#e5c07b' },
  { text: 'Component', color: '#e5c07b' },
  { text: 'Props', color: '#e5c07b' },
  { text: '<div>', color: '#98c379' },
  { text: '</div>', color: '#98c379' },
  { text: '<App />', color: '#98c379' },
  { text: '<Router>', color: '#98c379' },
  { text: '.map()', color: '#56b6c2' },
  { text: '.filter()', color: '#56b6c2' },
  { text: '.then()', color: '#56b6c2' },
  { text: 'fetch()', color: '#56b6c2' },
  { text: '=> {}', color: '#abb2bf' },
  { text: '{ }', color: '#abb2bf' },
  { text: '[ ]', color: '#abb2bf' },
  { text: 'null', color: '#d19a66' },
  { text: 'true', color: '#d19a66' },
  { text: 'false', color: '#d19a66' },
  { text: '"devinity"', color: '#98c379' },
  { text: 'className=', color: '#e06c75' },
  { text: 'onClick=', color: '#e06c75' },
  { text: 'key={id}', color: '#e06c75' },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 13;
    const lineHeight = 28;
    const colWidth = 130;
    const TRAIL_LENGTH = 8;

    const randomToken = () => CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];

    const makeStream = () => {
      const trailSize = 4 + Math.floor(Math.random() * (TRAIL_LENGTH - 4));
      return {
        y: Math.random() * -800,
        speed: 0.6 + Math.random() * 1.0,
        head: randomToken(),
        trail: Array.from({ length: trailSize }, () => randomToken()),
        active: true,
      };
    };

    let streams = [];
    const init = () => {
      const numCols = Math.ceil(window.innerWidth / colWidth);
      streams = Array.from({ length: numCols }, () => makeStream());
    };
    init();
    window.addEventListener('resize', init);

    let lastTime = 0;
    const draw = (time) => {
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      ctx.fillStyle = 'rgba(10, 14, 26, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streams.forEach((stream, col) => {
        const x = col * colWidth + 8;

        // Draw glowing head
        ctx.save();
        ctx.font = `${fontSize}px 'Fira Code', monospace`;
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = stream.head.color;
        ctx.shadowBlur = 12;
        ctx.fillText(stream.head.text, x, stream.y);
        ctx.restore();

        // Draw trailing tokens, fading with distance
        stream.trail.forEach((token, j) => {
          const ty = stream.y - (j + 1) * lineHeight;
          if (ty < -lineHeight || ty > canvas.height) return;
          const fade = 1 - (j + 1) / (stream.trail.length + 2);
          ctx.globalAlpha = fade * 0.75;
          ctx.font = `${fontSize}px 'Fira Code', monospace`;
          ctx.fillStyle = token.color;
          ctx.fillText(token.text, x, ty);
        });

        ctx.globalAlpha = 1;

        stream.y += stream.speed * (dt / 16);

        // When the full stream (head + trail) clears the bottom, reset
        const tailTop = stream.y - stream.trail.length * lineHeight;
        if (tailTop > canvas.height + 60) {
          const s = makeStream();
          s.y = -lineHeight * 2;
          streams[col] = s;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for new projects
        </div>
        <h1 className="hero-title">
          We Build <TypedWord />
          <br />
          <span className="hero-accent">That Actually Work.</span>
        </h1>
        <p className="hero-subtitle">
          Devinity is a specialist React &amp; web development studio. We craft fast, scalable,
          and beautiful digital products for startups and businesses.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
            See Our Work
          </button>
        </div>
        <div className="hero-stack">
          {['React', 'TypeScript', 'Node.js', 'Next.js', 'REST APIs', 'UI/UX'].map(tag => (
            <span key={tag} className="stack-tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
