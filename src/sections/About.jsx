import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheckSquare, FiMapPin, FiCpu, FiCode } from 'react-icons/fi';
import { portfolioData } from '../data/portfolioData';

// Dynamic CountUp component using standard requestAnimationFrame for maximum rendering stability
function StatCounter({ target, suffix = '', decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const endValue = parseFloat(target);

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      
      // Easing out function
      const easeOutQuad = (t) => t * (2 - t);
      const currentVal = easeOutQuad(rate) * endValue;

      setCount(currentVal);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, target, duration]);

  return (
    <span ref={elementRef}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function About() {
  const { location, cgpa } = portfolioData.personalInfo;

  return (
    <section id="about" className="py-24 bg-surface/30 backdrop-blur-[2px] border-y border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            Who I Am
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            About Me
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        {/* Narrative & Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative description */}
          <div className="lg:col-span-7 space-y-6 text-text-secondary leading-relaxed">
            <p className="text-lg text-text">
              I am a results-driven Front-End Developer based in{" "}
              <span className="text-text font-semibold">{location.split(',')[1]?.trim() || 'Chennai, India'}</span>, 
              focusing on building performant, responsive web apps.
            </p>
            
            <p>
              I graduated in 2025 with a Bachelor of Technology in Information Technology from 
              <span className="text-text font-medium"> Sri Krishna Engineering College</span> (CGPA 8.14). 
              To build a comprehensive understanding of software engineering, I completed an intensive 
              Java Full Stack & Spring Boot training program. This dual-focused training empowers me 
              to interface cleanly with back-end architectures while designing front-end layout engines.
            </p>

            <p>
              My development philosophy is centered around <strong className="text-text">"Signal, not noise"</strong>. 
              I value implementation details that make code modular and pages load instantly. For instance, on a 
              recent video-editor portfolio project (Beniyel Nikson), I refactored heavily tangled CSS conflict files 
              from scratch instead of patching over them. This resolved layout breaks on touch viewports, resulting in a 
              sustainable, clean codebase.
            </p>

            {/* Core Values / Work Styles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-display text-text">
              <div className="flex items-center space-x-3">
                <FiCheckSquare className="text-accent w-5 h-5 flex-shrink-0" />
                <span>Responsive Design from 320px → 4K</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-accent w-5 h-5 flex-shrink-0" />
                <span>Based in Chennai (Open to relocate)</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCpu className="text-accent w-5 h-5 flex-shrink-0" />
                <span>Performance-first optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCode className="text-accent w-5 h-5 flex-shrink-0" />
                <span>Modular, maintainable CSS structures</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Display */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Stat 1: Projects */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between"
            >
              <div className="font-display text-4xl font-extrabold text-primary mb-4">
                <StatCounter target="4" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-text">
                  Projects Shipped
                </h3>
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Freelance & Academic
                </p>
              </div>
            </motion.div>

            {/* Stat 2: Internship */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between"
            >
              <div className="font-display text-4xl font-extrabold text-accent mb-4">
                <StatCounter target="1" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-text">
                  Internship
                </h3>
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Java Full Stack
                </p>
              </div>
            </motion.div>

            {/* Stat 3: CGPA */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between"
            >
              <div className="font-display text-4xl font-extrabold text-primary mb-4">
                <StatCounter target={cgpa} decimals={2} />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-text">
                  B.Tech CGPA
                </h3>
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Info Technology
                </p>
              </div>
            </motion.div>

            {/* Stat 4: Responsive Check */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between"
            >
              <div className="font-display text-4xl font-extrabold text-accent mb-4">
                <StatCounter target="100" suffix="%" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-text">
                  Responsive
                </h3>
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Mobile to 4K Displays
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
