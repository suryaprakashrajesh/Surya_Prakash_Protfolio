import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiCheck } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';

export function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 bg-surface/30 backdrop-blur-[2px] border-y border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            Education
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        {/* Timeline container */}
        <div className="max-w-3xl relative border-l border-border/80 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Timeline Icon Node */}
              <div className="absolute left-0 top-1.5 -translate-x-[41px] md:-translate-x-[49px] w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface border border-accent flex items-center justify-center text-accent shadow-sm">
                <FiBookOpen className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
              </div>

              {/* Education Card */}
              <div className="p-6 md:p-8 bg-card border border-border rounded-2xl space-y-4 hover:border-accent/30 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    {/* Degree */}
                    <h3 className="text-lg md:text-xl font-display font-bold text-text">
                      {edu.degree}
                    </h3>
                    {/* Institution */}
                    <p className="font-display text-sm font-medium text-text-secondary mt-1">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Date Period Tag */}
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-text-secondary bg-surface border border-border px-3 py-1.5 rounded-lg w-fit">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Score badge */}
                <div className="flex items-center space-x-2 pt-2">
                  <span className="p-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                    <FiCheck className="w-3 h-3" />
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    Performance Result: <strong className="text-text font-semibold">{edu.score}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
