import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiAward } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            Professional Experience
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        {/* Timeline container */}
        <div className="max-w-3xl relative border-l border-border/80 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Timeline Icon Node */}
              <div className="absolute left-0 top-1.5 -translate-x-[41px] md:-translate-x-[49px] w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface border border-primary flex items-center justify-center text-primary shadow-sm">
                <FiBriefcase className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 md:p-8 bg-card border border-border rounded-2xl space-y-4 hover:border-primary/30 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    {/* Role Title */}
                    <h3 className="text-lg md:text-xl font-display font-bold text-text">
                      {exp.role}
                    </h3>
                    {/* Company */}
                    <p className="font-display text-sm font-medium text-primary mt-1">
                      {exp.company}
                    </p>
                  </div>

                  {/* Date Period Tag */}
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-text-secondary bg-surface border border-border px-3 py-1.5 rounded-lg w-fit">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Training Program subtitle */}
                <p className="font-mono text-xs text-accent font-semibold tracking-wide uppercase">
                  {exp.type}
                </p>

                {/* Details list */}
                <ul className="space-y-2.5 text-sm text-text-secondary list-disc pl-4 leading-relaxed">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>

                {/* Rating Badge */}
                {exp.rating && (
                  <div className="flex items-center space-x-2 pt-3 border-t border-border/40 w-fit">
                    <FiAward className="text-success w-4.5 h-4.5" />
                    <span className="font-mono text-xs text-text-secondary">
                      Performance Rating: <strong className="text-success font-semibold">{exp.rating}</strong>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
