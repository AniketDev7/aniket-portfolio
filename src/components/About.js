import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, X } from 'lucide-react';
import { getIcon } from '../utils/iconMapping';
import portfolioData from '../data/portfolioData.json';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [modalIndex, setModalIndex] = useState(null);

  const { about, experience } = portfolioData;
  const getOverview = (exp) => exp.overview || exp.description;
  const selectedExp = modalIndex !== null ? experience[modalIndex] : null;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setModalIndex(null);
    };
    if (modalIndex !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [modalIndex]);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text">About Me</h2>
          <p className="section-subtitle">Passionate QA Engineer dedicated to delivering exceptional software quality</p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>{about.title}</h3>
            <p>{about.description}</p>
            <p>{about.additionalDescription}</p>

            <div className="key-highlights">
              {about.highlights.map((highlight, index) => {
                const IconComponent = getIcon(highlight.icon);
                return (
                  <div key={highlight.title} className="highlight">
                    <IconComponent className="highlight-icon" />
                    <div>
                      <h4>{highlight.title}</h4>
                      <p>{highlight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="stats-grid">
              {about.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    
                    <div className="stat-number gradient-text">
                      {stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="experience-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3>Professional Journey</h3>
          <div className="experience-cards-grid">
            {experience.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.title}-${exp.period}`}
                  className="experience-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                >
                  <div className="experience-card-header">
                    <h4>{exp.title}</h4>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-period">{exp.period}</p>
                  </div>
                  <p className="experience-overview">{getOverview(exp)}</p>
                  <button
                    type="button"
                    className="experience-expand-btn"
                    onClick={() => setModalIndex(index)}
                  >
                    View details <ChevronDown size={16} />
                  </button>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {selectedExp && (
          <div
            className="experience-modal-backdrop"
            onClick={() => setModalIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
          >
            <motion.div
              className="experience-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="experience-modal-close"
                onClick={() => setModalIndex(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 id="experience-modal-title" className="experience-modal-title">{selectedExp.title}</h3>
              <p className="experience-modal-company">{selectedExp.company}</p>
              <p className="experience-modal-period">{selectedExp.period}</p>
              {selectedExp.location && (
                <p className="experience-modal-location">{selectedExp.location}</p>
              )}
              <p className="experience-modal-description">{selectedExp.description}</p>
              <div className="experience-modal-technologies">
                {selectedExp.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About; 