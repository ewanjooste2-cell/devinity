import { useEffect, useRef, useState } from 'react';
import './Stats.css';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 4,  suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: 'h', label: 'Response Time' },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-bar" ref={ref}>
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-value">
              <CountUp target={s.value} suffix={s.suffix} active={active} />
            </span>
            <span className="stat-label">{s.label}</span>
            {i < stats.length - 1 && <div className="stat-divider" />}
          </div>
        ))}
      </div>
    </section>
  );
}
