import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../hooks/useTheme';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Education } from '../sections/Education';
import { Certifications } from '../sections/Certifications';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';
import { IntroLoader } from '../components/IntroLoader';

export function Landing() {
  const { theme, toggleTheme } = useTheme();
  const [showIntro, setShowIntro] = useState(() => {
    // Show intro loader overlay only once per session to protect performance & LCP
    return !sessionStorage.getItem('hasSeenIntro');
  });

  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <>
      <Helmet>
        <title>Surya Prakash R | Premium Portfolio | Frontend Developer</title>
        <meta name="description" content="Portfolio of Surya Prakash R - Front-End Developer based in Chennai, specializing in React, high-performance web applications, and modular CSS systems." />
      </Helmet>

      {/* Intro Loader overlay layer - plays once per session */}
      {showIntro && <IntroLoader onFinish={handleIntroFinish} />}

      {/* Main page content is mounted immediately in the DOM */}
      <div className="flex flex-col min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow">
          <Hero theme={theme} toggleTheme={toggleTheme} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Landing;
