import { useState, useCallback, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/ui/Navbar';
import StarField from './components/ui/StarField';
import BottomNav from './components/ui/BottomNav';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';

function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Refresh ScrollTrigger after all components mount and after preloader finishes
  // This ensures Chrome computes correct trigger positions
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
  }, [loaded]);

  return (
    <>
      {/* Starfield Background */}
      <StarField />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Bottom Limelight Navigation */}
      <BottomNav />
    </>
  );
}

export default App;
