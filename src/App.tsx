import { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/ui/Navbar';
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

  return (
    <>
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
    </>
  );
}

export default App;
