import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import './Recommendations.css';

const Recommendations = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const data = portfolioData.recommendations;
  if (!data || !data.items || data.items.length === 0) return null;

  const { title, subtitle, items } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="recommendations" className="recommendations" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2 className="gradient-text" variants={itemVariants}>
            {title}
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="recommendations-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {items.map((rec, index) => (
            <motion.div
              key={rec.name + index}
              className="recommendation-card"
              variants={itemVariants}
              whileHover={{ y: -6 }}
            >
              <div className="recommendation-inner">
                <div className="recommendation-header">
                  {rec.avatar ? (
                    <img
                      src={rec.avatar}
                      alt={rec.name}
                      className="recommendation-avatar"
                    />
                  ) : (
                    <div className="recommendation-avatar-placeholder">
                      {rec.name.charAt(0)}
                    </div>
                  )}
                  <div className="recommendation-meta">
                    <h4 className="recommendation-name">{rec.name}</h4>
                    {(rec.rating && rec.rating > 0) && (
                      <div className="recommendation-stars">
                        {[...Array(Math.min(5, rec.rating))].map((_, i) => (
                          <Star key={i} className="star-icon" />
                        ))}
                      </div>
                    )}
                    <p className="recommendation-role">
                      {rec.role}{rec.company ? ` at ${rec.company}` : ''}
                    </p>
                  </div>
                </div>
                <div className="recommendation-content">
                  <Quote className="quote-icon" />
                  <p>{rec.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Recommendations;
