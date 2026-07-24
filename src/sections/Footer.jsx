import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export function Footer() {
  const { name, github, linkedin, email, whatsapp } = portfolioData.personalInfo;

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
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
    <footer className="bg-transparent border-t border-border/60 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Side: Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-display font-bold text-xl tracking-wider text-text select-none"
          >
            S<span className="text-primary">P</span>.
          </a>
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <p className="text-[10px] text-text-secondary/60 font-mono">
            Built with React 18 · Tailwind CSS · Framer Motion
          </p>
        </div>

        {/* Middle Side: Quick Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-display text-text-secondary">
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="inline-block hover:text-primary transition-colors">About</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className="inline-block hover:text-primary transition-colors">Skills</a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="inline-block hover:text-primary transition-colors">Projects</a>
          <a href="#experience" onClick={(e) => handleLinkClick(e, 'experience')} className="inline-block hover:text-primary transition-colors">Experience</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="inline-block hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Right Side: Social Icons & Back to Top */}
        <div className="flex items-center space-x-4">
          {/* Social icons */}
          <div className="flex items-center space-x-2">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-card border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
            >
              <FiGithub className="w-4.5 h-4.5" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-card border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
            >
              <FiLinkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp Direct Message"
              className="p-2 rounded-lg bg-card border border-border text-text-secondary hover:text-success hover:border-success transition-colors duration-300"
            >
              <FaWhatsapp className="w-4.5 h-4.5" />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Send email on Gmail"
              className="p-2 rounded-lg bg-card border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
            >
              <FiMail className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={handleBackToTop}
            aria-label="Scroll back to top"
            className="clickable p-2.5 rounded-lg bg-primary text-[#FFFFFF] hover:bg-opacity-95 shadow-md shadow-primary/10 transition-transform duration-300 hover:scale-105"
          >
            <FiArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
