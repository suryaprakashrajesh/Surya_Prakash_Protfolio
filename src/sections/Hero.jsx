import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiArrowRight, FiMail, FiDownload, FiSliders, FiActivity, FiLayers, FiMoon, FiSun } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';

const words = [
  "React Specialist",
  "Frontend Developer",
  "CSS Architect",
  "UI/UX Engineer"
];

export function Hero({ theme, toggleTheme }) {
  const { name, subtitle, degree, cgpa, location, availableForFullTime } = portfolioData.personalInfo;
  
  // Typing Effect State
  const [wordIndex, setWordIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Reduced motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Typing effect loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setSubText(words[0]);
      return;
    }

    const currentFullWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setSubText(currentFullWord.substring(0, subText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Writing text
      timer = setTimeout(() => {
        setSubText(currentFullWord.substring(0, subText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    // Word complete states
    if (!isDeleting && subText === currentFullWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
    } else if (isDeleting && subText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, wordIndex, typingSpeed, prefersReducedMotion]);

  // Framer Motion controls for the cursor demo click
  const cursorControls = useAnimation();
  const switchRippleControls = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Sequence to animate pointer finger to point at the theme switch, click, and fade out
    const sequence = async () => {
      // 1. Hover in
      await cursorControls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { delay: 1.5, duration: 1.0, ease: 'easeOut' }
      });
      // 2. Click (scale down slightly)
      await cursorControls.start({
        scale: 0.8,
        transition: { duration: 0.2 }
      });
      // 3. Trigger a ripple effect on the toggle switch (without re-theming the whole site automatically)
      switchRippleControls.start({
        scale: [1, 1.3, 1],
        boxShadow: ["0 0 0px var(--accent)", "0 0 12px var(--accent)", "0 0 0px var(--accent)"],
        transition: { duration: 0.4 }
      });
      // 4. Release click
      await cursorControls.start({
        scale: 1,
        transition: { duration: 0.1 }
      });
      // 5. Retreat and fade out
      await cursorControls.start({
        x: 40,
        y: 40,
        opacity: 0,
        transition: { delay: 0.8, duration: 0.6, ease: 'easeIn' }
      });
    };

    sequence();
  }, [cursorControls, switchRippleControls, prefersReducedMotion]);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bg"
    >
      {/* Background radial soft lights */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          prefersReducedMotion ? '' : 'animate-pulse-subtle'
        }`}
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(94, 234, 212, 0.03) 0%, transparent 40%)'
            : 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.03) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(13, 148, 136, 0.02) 0%, transparent 40%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headline, Bio & Call to Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Greeting Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2.5 mb-5"
          >
            <span className="w-8 h-[1px] bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              Hi, I'm
            </span>
          </motion.div>

          {/* Core Name Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-4"
          >
            {name}
          </motion.h1>

          {/* Animated Typing Role Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 md:h-12 flex items-center mb-6"
          >
            <span className="font-display text-2xl md:text-3xl font-semibold text-text-secondary">
              A{" "}
              <span className="text-primary font-bold border-r-2 border-accent pr-1 animate-pulse">
                {subText}
              </span>
            </span>
          </motion.div>

          {/* Subheading Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed max-w-xl mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Meta Information Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10 text-xs font-mono"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-text-secondary flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{degree} · CGPA {cgpa}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-surface border border-border text-text-secondary flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{location}</span>
            </div>
            {availableForFullTime && (
              <div className="px-3.5 py-1.5 rounded-full bg-success/10 border border-success/20 text-success flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                <span>Available for Full-time Roles</span>
              </div>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollToSection('projects')}
              className="group clickable flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-primary text-[#FFFFFF] font-display text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
            >
              <span>View Projects</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => handleScrollToSection('contact')}
              className="clickable flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-surface border border-border text-text hover:text-accent hover:border-accent font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
            >
              <FiMail className="w-4 h-4" />
              <span>Contact Me</span>
            </button>

            <a
              href="/Surya_Prakash_R_Resume.pdf"
              download="Surya_Prakash_R_Resume.pdf"
              className="clickable sm:hidden flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-surface border border-border text-text font-display text-sm font-semibold tracking-wide transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Signature Micro-interaction Browser Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center lg:justify-end select-none relative"
        >
          {/* Main "Browser Chrome" Card container */}
          <div className="w-full max-w-[400px] rounded-2xl bg-card border border-border shadow-2xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-accent/5">
            {/* Browser Dots */}
            <div className="flex items-center space-x-1.5 mb-6 border-b border-border/40 pb-4">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              <div className="ml-4 font-mono text-[10px] text-text-secondary/60 bg-surface/50 border border-border/30 px-3 py-0.5 rounded-md flex-grow text-center overflow-hidden whitespace-nowrap text-ellipsis">
                localhost:3000/settings
              </div>
            </div>

            {/* Dashboard settings content */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2 text-text">
                <FiSliders className="w-4 h-4 text-accent" />
                <span className="font-display text-xs font-semibold uppercase tracking-wider">
                  Interface Preferences
                </span>
              </div>

              {/* Core Feature Theme Toggle Option */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-border">
                <div className="flex flex-col">
                  <span className="font-display text-sm font-medium text-text">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <span className="font-mono text-[10px] text-text-secondary mt-0.5">
                    {theme === 'dark' ? '#09090B' : '#FAFAFA'} Theme Active
                  </span>
                </div>

                {/* Animated Theme Switch Switcher */}
                <motion.button
                  onClick={toggleTheme}
                  animate={switchRippleControls}
                  className={`w-12 h-6.5 p-1 rounded-full border border-border transition-colors duration-300 flex items-center relative cursor-pointer ${
                    theme === 'dark' ? 'bg-primary/20 border-primary' : 'bg-accent-border/20 border-accent-border'
                  }`}
                  aria-label="Theme mode switcher toggle inside card"
                >
                  <motion.div
                    className="w-4.5 h-4.5 rounded-full flex items-center justify-center bg-primary"
                    style={{
                      backgroundColor: theme === 'dark' ? 'var(--primary)' : 'var(--accent)',
                    }}
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    animate={{
                      marginLeft: theme === 'dark' ? 'auto' : '0px',
                    }}
                  >
                    {theme === 'dark' ? (
                      <FiMoon className="w-2.5 h-2.5 text-[#FFFFFF]" />
                    ) : (
                      <FiSun className="w-2.5 h-2.5 text-[#FFFFFF]" />
                    )}
                  </motion.div>
                </motion.button>
              </div>

              {/* Mock Dashboard Sliders & Info */}
              <div className="space-y-3.5 pt-2">
                {/* CSS Systems untangled stat */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[10px] text-text-secondary">
                    <span className="flex items-center gap-1"><FiLayers /> CSS Conflict Resolution</span>
                    <span className="text-accent font-bold">100% Resolved</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden border border-border">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-accent"
                    />
                  </div>
                </div>

                {/* Performance score chart mock */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface/50 border border-border/50">
                  <div className="flex items-center space-x-2">
                    <FiActivity className="text-success w-4.5 h-4.5" />
                    <span className="font-mono text-[10px] text-text-secondary">Performance Index</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded border border-success/20">
                    99%
                  </span>
                </div>
              </div>

              {/* Mono Code Section */}
              <div className="bg-surface rounded-xl p-3.5 border border-border/80 font-mono text-[10px] text-text-secondary overflow-x-auto space-y-1 select-text">
                <p className="text-accent-border/90">{"// CSS Untangled system"}</p>
                <p><span className="text-primary">const</span> theme = <span className="text-accent">"{theme}"</span>;</p>
                <p><span className="text-primary">document</span>.body.className = theme;</p>
              </div>
            </div>

            {/* Micro-interaction pointer demo hand (drawn on initial load only) */}
            {!prefersReducedMotion && (
              <motion.div
                initial={{ x: 100, y: 150, opacity: 0 }}
                animate={cursorControls}
                className="absolute pointer-events-none z-30"
                style={{
                  top: '102px', // positioned pointing to switch
                  right: '42px',
                }}
              >
                {/* Custom SVG Finger pointer */}
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="filter drop-shadow-lg"
                >
                  <path
                    d="M3 27L8.5 13.5L12.5 17.5L21 2L23 4L14.5 19.5L18.5 23.5L3 27Z"
                    fill="var(--accent)"
                    stroke="var(--bg)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Visual click ring circle marker */}
                  <circle cx="21" cy="2" r="2" fill="#FFFFFF" />
                </svg>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
