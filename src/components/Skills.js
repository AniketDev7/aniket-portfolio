import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getIcon } from '../utils/iconMapping';
import portfolioData from '../data/portfolioData.json';
import './Skills.css';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { skills } = portfolioData;

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text">Skills & Expertise</h2>
          <p className="section-subtitle">Comprehensive testing skills and technical expertise</p>
        </motion.div>

        <div className="skills-content">
          <motion.div
            className="skills-by-category"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skills.categories.map((category, categoryIndex) => {
              const CategoryIcon = getIcon(category.icon);
              return (
                <div key={category.title} className="skill-category-row">
                  <div className="skill-category-label">
                    <CategoryIcon className="category-icon" />
                    <span>{category.title}</span>
                  </div>
                  <div className="skill-tags-row">
                    {category.skills.map((skill) => (
                      <span key={skill.name} className="skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            className="testing-types"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Testing Specializations</h3>
            
            <div className="types-grid">
              {skills.specializations.map((type, index) => {
                const TypeIcon = getIcon(type.icon);
                return (
                  <motion.div
                    key={type.title}
                    className="type-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="type-header">
                      <TypeIcon className="type-icon" />
                      <h4>{type.title}</h4>
                    </div>
                    
                    <p className="type-description">{type.description}</p>
                    
                    <ul className="type-features">
                      {type.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.8 + index * 0.2 + featureIndex * 0.1 
                          }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="certifications"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Globally recognized certifications</h3>
          <div className="cert-grid cert-grid-featured">
            {skills.certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="cert-card cert-card-featured"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/11093/11093660.png" alt="Certified" className="cert-badge-icon" title="Certified" />
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 