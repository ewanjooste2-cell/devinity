import { useState, useEffect } from 'react';
import './Navbar.css';

const links = ['Services', 'Portfolio'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['services', 'portfolio', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 120) setActive(id);
        }
      }
      if (window.scrollY < 100) setActive('');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="logo-bracket">&lt;</span>
          Devinity
          <span className="logo-bracket"> /&gt;</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map(link => (
            <li key={link}>
              <button
                onClick={() => handleNav(link)}
                className={active === link.toLowerCase() ? 'nav-active' : ''}
              >{link}</button>
            </li>
          ))}
          <li>
            <button className="btn btn-primary nav-cta" onClick={() => handleNav('Contact')}>
              Let's Talk
            </button>
          </li>
        </ul>

        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
