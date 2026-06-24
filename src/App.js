import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="App">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
