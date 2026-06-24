import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            Devinity
            <span className="logo-bracket"> /&gt;</span>
          </span>
          <p className="footer-tagline">React &amp; Web Development Specialists</p>
        </div>
        <nav className="footer-nav">
          {['Services', 'Portfolio', 'Contact'].map(link => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              {link}
            </button>
          ))}
        </nav>
        <p className="footer-copy">© {year} Devinity. Built with React.</p>
      </div>
    </footer>
  );
}
