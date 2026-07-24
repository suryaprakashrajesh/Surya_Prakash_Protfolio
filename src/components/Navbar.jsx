import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Education', id: 'education' },
  { name: 'Contact', id: 'contact' },
];

export function Navbar({ theme, toggleTheme, introComplete = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track active section to slide the nav underline indicator
  const activeSection = useScrollSpy(navLinks.map((link) => link.id));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    if (e) {
      e.preventDefault();
    }
    
    // Close mobile menu drawer first
    setMobileMenuOpen(false);

    // Defer scroll calculation to next tick after drawer closes so touch events don't cancel smooth scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = Math.max(0, elementPosition + window.scrollY - headerOffset);

        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        } catch {
          window.scrollTo(0, offsetPosition);
        }
      }
    }, 60);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav border-b border-border py-4 shadow-sm'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display font-bold text-2xl tracking-wider text-text cursor-pointer select-none group"
        >
          S<span className="text-primary group-hover:text-accent transition-colors duration-300">P</span>.
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`relative px-4 py-2 font-display text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                  isActive ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Buttons: Theme toggle & Resume download */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2.5 rounded-xl bg-surface border border-border text-text hover:text-accent hover:border-accent transition-all duration-300"
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          {/* Download Resume */}
          <a
            href="/Surya_Prakash_R_Resume.pdf"
            download="Surya_Prakash_R_Resume.pdf"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-primary text-[#FFFFFF] hover:bg-opacity-90 font-display text-sm font-medium tracking-wide shadow-md shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
          >
            <span>Resume</span>
            <FiDownload className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Control buttons */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-xl bg-surface border border-border text-text transition-colors duration-300"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-xl bg-surface border border-border text-text hover:text-primary transition-colors duration-300"
          >
            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`py-2 font-display text-base font-medium transition-colors duration-300 border-b border-border/50 pb-2 ${
                      isActive ? 'text-primary pl-2 border-l-2 border-primary border-b-transparent pb-0 ml-[-8px]' : 'text-text-secondary'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              {/* Resume download button in mobile list */}
              <a
                href="/Surya_Prakash_R_Resume.pdf"
                download="Surya_Prakash_R_Resume.pdf"
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-primary text-[#FFFFFF] font-display text-sm font-medium tracking-wide shadow-md shadow-primary/10 transition-colors duration-300 mt-4"
              >
                <span>Download Resume</span>
                <FiDownload className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
