import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFolder, FiMonitor, FiCpu, FiMaximize2, FiX } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';
import flawlessImg from '../assets/images/fawless_photography.png';

// Interactive mini-carousel preview for Beniyel Nikson card
function MiniCarousel() {
  const thumbnails = [
    { id: 1, color: "bg-red-500/20 border-red-500/40 text-red-400", text: "Montage.mp4" },
    { id: 2, color: "bg-amber-500/20 border-amber-500/40 text-amber-400", text: "Intro_v2.mov" },
    { id: 3, color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400", text: "Thumbnail_Fin.png" },
    { id: 4, color: "bg-blue-500/20 border-blue-500/40 text-blue-400", text: "Vlog_Cut.prproj" },
    { id: 5, color: "bg-purple-500/20 border-purple-500/40 text-purple-400", text: "Color_Grade.cube" },
  ];

  return (
    <div className="mt-4 rounded-lg bg-surface/50 border border-border/80 p-3 select-none">
      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block mb-2 font-medium">
        Diegetic Mobile Carousel Demo (Auto-scroll)
      </span>
      {/* Container simulating a mobile horizontal view */}
      <div className="w-full overflow-hidden relative h-10 border border-border/60 rounded bg-bg/90 flex items-center">
        {/* Edge fade gradients for polished visual clipping boundary */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-bg to-transparent z-10 rounded-l" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-bg to-transparent z-10 rounded-r" />

        {/* Sliding marquee track pinned strictly at left-0 */}
        <div className="flex items-center gap-2 animate-marquee whitespace-nowrap absolute left-0 top-0 h-full w-max">
          {[...thumbnails, ...thumbnails].map((item, index) => (
            <div
              key={index}
              className={`inline-flex items-center px-2.5 py-1 rounded text-[9px] font-mono border shrink-0 ${item.color}`}
            >
              <FiMonitor className="mr-1 flex-shrink-0 w-3 h-3" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Custom marquee keyframes injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 16s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            position: relative;
            transform: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalImage(null);
      }
    };
    if (activeModalImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalImage]);

  // Filter keys: All, React, JavaScript, Academic/Security
  const filterOptions = ['All', 'React', 'JavaScript', 'Academic/Security'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'React') return project.tech.includes('React');
    if (filter === 'JavaScript') return project.tech.includes('JavaScript') || project.tech.includes('JS');
    if (filter === 'Academic/Security') return project.category === 'academic';
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-surface border-b border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            Featured Projects
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        {/* Dynamic Filter Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wide transition-all duration-300 border ${
                filter === opt
                  ? 'bg-primary text-[#FFFFFF] border-primary shadow-md shadow-primary/20 font-semibold scale-[1.02]'
                  : 'bg-card text-text-secondary border-border hover:border-accent hover:text-text hover:shadow-sm'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isOddTotal = filteredProjects.length % 2 !== 0;
              const isLastItem = index === filteredProjects.length - 1;
              const shouldCenter = isOddTotal && isLastItem;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/45 transition-colors duration-300 relative overflow-hidden ${
                    shouldCenter ? 'lg:col-span-2 lg:max-w-xl lg:mx-auto w-full' : ''
                  }`}
                >
                <div>
                  {/* Eyebrow Label */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                      {project.subCategory}
                    </span>
                    <span className="font-mono text-[10px] text-text-secondary">
                      {project.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Dynamic Inline Preview for Beniyel Nikson Portfolio */}
                  {project.id === 'beniyel-nikson' && <MiniCarousel />}

                  {/* Image Showcase Preview for Flawless Photography */}
                  {project.id === 'flawless-photography' && (
                    <div 
                      onClick={() => setActiveModalImage({ src: flawlessImg, title: project.title })}
                      className="mt-4 rounded-xl border border-border/80 overflow-hidden bg-surface/50 group/img relative shadow-sm cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label="View Flawless Photography preview in full screen"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveModalImage({ src: flawlessImg, title: project.title });
                        }
                      }}
                    >
                      <img
                        src={flawlessImg}
                        alt={project.title}
                        className="w-full h-48 md:h-52 object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                        <span className="font-mono text-[10px] text-text bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded border border-border flex items-center gap-1.5 shadow-md">
                          <FiMaximize2 className="w-3 h-3 text-accent" /> Click to view full screen
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Tech Stack & Action Links */}
                <div className="mt-8 space-y-6">
                  {/* Tech stack pills using JetBrains Mono */}
                  <div className="flex flex-wrap gap-2 border-t border-border/40 pt-4">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="font-mono text-[10px] px-2.5 py-1 rounded bg-surface border border-border text-text-secondary"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 text-sm font-display font-medium">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1.5 text-primary hover:text-accent transition-colors duration-300"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-colors duration-300"
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveModalImage(null)}
            className="fixed inset-0 z-[99999] bg-bg/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out select-none"
          >
            {/* Top Controls Bar */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center space-x-3 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalImage(null);
                }}
                className="p-2.5 rounded-full bg-card/90 text-text hover:text-accent border border-border hover:border-accent transition-colors duration-200 shadow-xl cursor-pointer flex items-center gap-2 font-mono text-xs"
                aria-label="Close full screen view"
              >
                <span className="hidden sm:inline">Close (ESC)</span>
                <FiX className="w-5 h-5 text-accent" />
              </button>
            </div>

            {/* Title Header */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
              <h4 className="text-lg md:text-xl font-display font-bold text-text">
                {activeModalImage.title}
              </h4>
              <span className="font-mono text-xs text-text-secondary">Full Screen Showcase</span>
            </div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl max-h-[85vh] overflow-auto rounded-2xl border border-border/80 shadow-2xl bg-card relative cursor-default"
            >
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                className="w-full h-auto object-contain max-h-[82vh] rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
