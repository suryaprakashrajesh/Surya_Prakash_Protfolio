import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiDownload, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import profileImg from '../assets/images/profile/me.png';

const words = [
  "React Specialist",
  "Frontend Developer",
  "CSS Architect",
  "UI/UX Engineer"
];

export function Hero({ theme, toggleTheme, introComplete = true }) {
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
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
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
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.05 }}
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
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-4"
          >
            {name}
          </motion.h1>

          {/* Animated Typing Role Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.25 }}
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
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-lg text-text-secondary leading-relaxed max-w-xl mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Meta Information Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.45 }}
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
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.55 }}
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

        {/* Right Column: Refined Conference Lanyard ID Badge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end select-none relative pt-2">
          
          {/* Lanyard + Card Rigid Assembly Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { y: -450, opacity: 0, rotate: 0 }}
            animate={
              introComplete
                ? prefersReducedMotion
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : { 
                      y: 0, 
                      opacity: 1,
                      rotate: [-2, 2, -2],
                    }
                : { y: -450, opacity: 0, rotate: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.5 }
                : {
                    y: { type: "spring", stiffness: 120, damping: 10, mass: 1, delay: 0.55 },
                    opacity: { duration: 0.3, delay: 0.55 },
                    rotate: {
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 1.4,
                    }
                  }
            }
            style={{ transformOrigin: 'top center' }}
            className="w-full max-w-[320px] sm:max-w-[350px] flex flex-col items-center relative z-20"
          >
            {/* Top Woven Lanyard Ribbon + Black D-Ring + Metal Lobster Hook Clip (Extends to Top of Webpage) */}
            <div className="flex flex-col items-center shrink-0 z-30 relative -mt-24 md:-mt-32">
              {/* Dark Woven Fabric Strap extending up to top edge of webpage */}
              <div className="w-5 h-38 md:h-48 bg-neutral-900 border-x border-neutral-700/80 shadow-md relative flex flex-col items-center justify-center overflow-hidden shrink-0">
                <div className="w-[1px] h-full bg-neutral-700/60 absolute left-1" />
                <div className="w-[1px] h-full bg-neutral-700/60 absolute right-1" />
                <div className="flex flex-col gap-6 opacity-75 select-none">
                  <span className="font-mono text-[7px] font-bold tracking-[0.25em] text-neutral-300 uppercase rotate-90 whitespace-nowrap">
                    SURYA PRAKASH
                  </span>
                  <span className="font-mono text-[7px] font-bold tracking-[0.25em] text-neutral-300 uppercase rotate-90 whitespace-nowrap">
                    FRONTEND DEV
                  </span>
                </div>
              </div>

              {/* Black Metal D-Ring Loop */}
              <div className="w-6 h-2.5 rounded-[3px] border-2 border-neutral-900 bg-neutral-800 shadow-md -mt-0.5 z-20 shrink-0" />

              {/* Black Metal Swivel J-Hook Clip */}
              <div className="-mt-1 z-30 relative flex flex-col items-center shrink-0">
                <svg width="18" height="26" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                  {/* Swivel Loop Ring */}
                  <circle cx="10" cy="5" r="3.5" stroke="#171717" strokeWidth="2.5" fill="#262626" />
                  {/* Hook Body Stem */}
                  <path d="M8 8.5H12V16C12 18 10 19.5 10 19.5" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Hook Loop Hooking into Slot */}
                  <path d="M10 19.5C10 19.5 7.5 22 7.5 24.5C7.5 26.5 9 27.5 10.5 27.5C12.5 27.5 13.5 25.5 13.5 23" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Main ID Badge Card (Compact & High-Contrast) */}
            <div className="w-full rounded-2xl bg-card border-2 border-border shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-accent/15 -mt-3 pt-2">
              
              {/* Separate Top Lip Header with Centered Hole Punch Slot & Browser Chrome Dots */}
              <div className="w-full pt-2 pb-2 flex flex-col items-center border-b border-border/40 bg-surface/40 relative z-20 gap-2">
                {/* Hole Punch Slot */}
                <div className="w-7 h-2 rounded-full bg-bg border border-border/80 shadow-inner flex items-center justify-center">
                  <div className="w-5.5 h-1 rounded-full bg-border/70" />
                </div>

                {/* Browser Chrome Dots & URL Bar */}
                <div className="w-full px-3.5 flex items-center space-x-1.5 pt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <div className="ml-2.5 font-mono text-[9.5px] text-text-secondary/70 bg-bg/80 border border-border/40 px-2 py-0.5 rounded-md flex-grow text-center overflow-hidden whitespace-nowrap text-ellipsis">
                    localhost:3000/whoami
                  </div>
                </div>
              </div>

              {/* Editorial Background Typography & Code Symbols Layer */}
              <div 
                className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
                style={{
                  maskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 100%)',
                }}
                aria-hidden="true"
              >
                {/* Large Editorial Text Rows (Using var(--text) at 18% opacity for crisp visibility in both themes) */}
                <div 
                  className="absolute inset-[-25%] opacity-[0.18] rotate-[-5deg] flex flex-col gap-2 font-display font-black text-2xl sm:text-3xl uppercase tracking-[0.2em] leading-tight"
                  style={{ color: 'var(--text)' }}
                >
                  <div className="whitespace-nowrap flex gap-3">
                    <span>REACT</span><span>•</span><span>JAVASCRIPT</span><span>•</span><span>FRONTEND</span>
                  </div>
                  <div className="whitespace-nowrap flex gap-3 ml-6">
                    <span>SURYA PRAKASH</span><span>•</span><span>UI ENGINEER</span>
                  </div>
                  <div className="whitespace-nowrap flex gap-3 -ml-4">
                    <span>RESPONSIVE</span><span>•</span><span>PIXEL PERFECT</span>
                  </div>
                  <div className="whitespace-nowrap flex gap-3 ml-8">
                    <span>ACCESSIBLE</span><span>•</span><span>MODERN WEB</span>
                  </div>
                  <div className="whitespace-nowrap flex gap-3 -ml-6">
                    <span>CLEAN CODE</span><span>•</span><span>PERFORMANCE</span>
                  </div>
                  <div className="whitespace-nowrap flex gap-3 ml-4">
                    <span>WEB DEVELOPER</span><span>•</span><span>SURYA PRAKASH</span>
                  </div>
                  <div className="whitespace-nowrap flex gap-3 -ml-8">
                    <span>REACT</span><span>•</span><span>FRONTEND</span><span>•</span><span>PERFORMANCE</span>
                  </div>
                </div>

                {/* Scattered Floating Code Symbols */}
                <div 
                  className="absolute inset-0 font-mono text-xs font-extrabold opacity-[0.14] p-4 flex flex-col justify-between pointer-events-none"
                  style={{ color: 'var(--text)' }}
                >
                  <div className="flex justify-between">
                    <span>{"< />"}</span>
                    <span>{"{ }"}</span>
                    <span>{"//"}</span>
                  </div>
                  <div className="flex justify-around">
                    <span>{"=>"}</span>
                    <span>{"const"}</span>
                    <span>{"#"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{"export"}</span>
                    <span>{"( )"}</span>
                    <span>{"Async"}</span>
                  </div>
                </div>
              </div>

              {/* Foreground ID Card Content */}
              <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center text-center space-y-3 pt-3">
                
                {/* Avatar Badge (Me Profile Picture - Enlarged) */}
                <div className="relative">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden shadow-xl border-2 border-border ring-2 ring-primary/30 select-none bg-card flex items-center justify-center">
                    <img 
                      src={profileImg} 
                      alt={name} 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  {/* Online Status Dot */}
                  <span 
                    className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-success ring-2 ring-card z-10" 
                    title="Online / Available"
                  />
                </div>

                {/* Identity Header */}
                <div className="space-y-0.5">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-text tracking-tight">
                    {name}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface border border-border text-[11px] font-mono text-text-secondary">
                    Frontend Developer
                  </span>
                </div>

                {/* Location & Tagline */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center space-x-1.5 text-[11px] text-text-secondary font-mono">
                    <FiMapPin className="w-3 h-3 text-accent shrink-0" />
                    <span>Tambaram, Chennai, India</span>
                  </div>
                  <p className="text-[11px] text-text-secondary italic">
                    "Building clean, responsive interfaces."
                  </p>
                </div>

                {/* Social Buttons Row */}
                <div className="flex items-center justify-center space-x-2.5 pt-0.5">
                  <a
                    href={portfolioData.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-colors duration-300 shadow-sm"
                  >
                    <FiGithub className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={portfolioData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-colors duration-300 shadow-sm"
                  >
                    <FiLinkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={portfolioData.personalInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Direct Message"
                    className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:border-success hover:text-success transition-colors duration-300 shadow-sm"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${portfolioData.personalInfo.email}`}
                    aria-label="Send Email"
                    className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-colors duration-300 shadow-sm"
                  >
                    <FiMail className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Primary Full-Width CTA */}
                <button
                  type="button"
                  onClick={() => handleScrollToSection('contact')}
                  className="w-full py-2.5 px-5 rounded-xl bg-primary text-[#FFFFFF] font-display text-xs font-semibold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:translate-y-[-1px] active:translate-y-0 cursor-pointer flex items-center justify-center space-x-1.5 mt-0.5"
                >
                  <span>Get in Touch</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Mono Code Block */}
                <div className="w-full bg-surface rounded-xl p-2.5 border border-border font-mono text-[9.5px] text-text-secondary overflow-x-auto text-left space-y-0.5 select-text">
                  <p className="text-accent-border/90">{"// status: open to work"}</p>
                  <p><span className="text-primary">const</span> available = <span className="text-accent">true</span>;</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
