import { motion } from 'framer-motion';
import { 
  FiLayout, 
  FiTerminal, 
  FiFeather, 
  FiBookOpen, 
  FiMonitor, 
  FiGlobe 
} from 'react-icons/fi';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaJava, 
  FaGitAlt, 
  FaGithub, 
  FaNodeJs 
} from 'react-icons/fa';
import { 
  SiVite, 
  SiFirebase, 
  SiVercel, 
  SiSpringboot, 
  SiExpress, 
  SiTailwindcss,
  SiFigma
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

import { portfolioData } from '../data/portfolioData';

// Category icons
const categoryIcons = {
  "Frontend": <FiLayout className="w-5 h-5 text-primary" />,
  "Programming": <FiTerminal className="w-5 h-5 text-accent" />,
  "Tools & Platforms": <FiFeather className="w-5 h-5 text-primary" />,
  "Currently Learning": <FiBookOpen className="w-5 h-5 text-accent" />
};

// Skill-specific brand icons with authentic accent colors
const skillIcons = {
  "HTML5": <FaHtml5 className="w-4 h-4 text-[#E34F26]" />,
  "CSS3": <FaCss3Alt className="w-4 h-4 text-[#1572B6]" />,
  "JavaScript (ES6+)": <FaJs className="w-4 h-4 text-[#F7DF1E]" />,
  "React": <FaReact className="w-4 h-4 text-[#61DAFB]" />,
  "Vite": <SiVite className="w-4 h-4 text-[#646CFF]" />,
  "Responsive Design": <FiMonitor className="w-4 h-4 text-accent" />,
  "Java": <FaJava className="w-4 h-4 text-[#E76F00]" />,
  "Git": <FaGitAlt className="w-4 h-4 text-[#F05032]" />,
  "GitHub": <FaGithub className="w-4 h-4 text-text" />,
  "GitHub Pages": <FiGlobe className="w-4 h-4 text-primary" />,
  "Vercel": <SiVercel className="w-4 h-4 text-text" />,
  "Firebase": <SiFirebase className="w-4 h-4 text-[#FFCA28]" />,
  "VS Code": <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />,
  "Figma": <SiFigma className="w-4 h-4 text-[#F24E1E]" />,
  "Spring Boot": <SiSpringboot className="w-4 h-4 text-[#6DB33F]" />,
  "Node.js": <FaNodeJs className="w-4 h-4 text-[#339933]" />,
  "Express.js": <SiExpress className="w-4 h-4 text-text" />,
  "Tailwind CSS": <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />,
};

export function Skills() {
  const { skills } = portfolioData;

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="skills" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            My Toolbox
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            Skills & Expertise
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        {/* Grouped Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(categories).map(([category, items]) => (
            <motion.div
              key={category}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: 'var(--primary)' }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-xl bg-surface border border-border">
                  {categoryIcons[category] || <FiTerminal className="w-5 h-5" />}
                </div>
                <h3 className="font-display text-base font-semibold text-text">
                  {category}
                </h3>
              </div>

              {/* Skills Tag Cloud with Brand Icons */}
              <div className="flex flex-wrap gap-2.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center space-x-2 font-mono text-xs px-3.5 py-2 rounded-xl bg-surface border border-border text-text hover:text-accent hover:border-accent-border hover:bg-bg transition-all duration-300 cursor-default select-none shadow-sm"
                  >
                    {skillIcons[item] && (
                      <span className="flex-shrink-0">{skillIcons[item]}</span>
                    )}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
