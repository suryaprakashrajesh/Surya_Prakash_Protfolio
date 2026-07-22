import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';

export function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            Certifications
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        {/* Certifications Grid */}
        <div className="max-w-3xl space-y-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 bg-card border border-border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                {/* Certificate Icon */}
                <div className="p-3 rounded-xl bg-surface border border-border text-primary flex-shrink-0">
                  <FiAward className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  {/* Title */}
                  <h3 className="text-base md:text-lg font-display font-bold text-text">
                    {cert.title}
                  </h3>
                  {/* Issuer */}
                  <p className="font-display text-sm font-medium text-text-secondary">
                    {cert.issuer}
                  </p>
                  
                  {/* Date Period Tag for Mobile */}
                  <div className="flex items-center space-x-1 text-xs text-text-secondary/70 pt-1 md:hidden">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{cert.period}</span>
                  </div>
                </div>
              </div>

              {/* Action and date column */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 flex-wrap border-t border-border/40 pt-4 md:border-0 md:pt-0">
                {/* Date Period Tag for Desktop */}
                <div className="hidden md:flex items-center space-x-1.5 text-xs font-mono text-text-secondary bg-surface border border-border px-3 py-1.5 rounded-lg">
                  <FiCalendar className="w-3.5 h-3.5" />
                  <span>{cert.period}</span>
                </div>

                {/* Verification Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs font-mono font-medium text-primary hover:text-accent transition-colors duration-300 cursor-pointer"
                  >
                    <span>View Certificate</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
