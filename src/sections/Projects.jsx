import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFolder, FiMonitor, FiCpu } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';

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
      <span className="font-mono text-[9px] text-text-secondary/70 uppercase tracking-widest block mb-2">
        Diegetic Mobile Carousel Demo (Auto-scroll)
      </span>
      {/* Container simulating a mobile horizontal view */}
      <div className="w-full overflow-hidden relative h-10 border border-border/40 rounded bg-bg/80 flex items-center">
        {/* Sliding marquee track */}
        <div className="flex space-x-2 animate-marquee whitespace-nowrap absolute">
          {[...thumbnails, ...thumbnails].map((item, index) => (
            <div
              key={index}
              className={`inline-flex items-center px-2.5 py-1 rounded text-[9px] font-mono border ${item.color}`}
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
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all duration-300 border ${
                filter === opt
                  ? 'bg-primary text-[#FFFFFF] border-primary shadow-md shadow-primary/10'
                  : 'bg-card text-text-secondary border-border hover:border-accent hover:text-accent'
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
    </section>
  );
}
