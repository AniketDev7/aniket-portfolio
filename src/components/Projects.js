import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play } from 'lucide-react';
import { getIcon } from '../utils/iconMapping';
import portfolioData from '../data/portfolioData.json';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [activeCategory, setActiveCategory] = useState('All');

  const { projects } = portfolioData;

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text">Projects & Work</h2>
          <p className="section-subtitle">Showcasing my testing expertise through real-world projects</p>
        </motion.div>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => {
            const ProjectIcon = getIcon(project.icon);
            return (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <motion.a
                        href={project.demo}
                        className="project-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play size={16} />
                        Demo
                      </motion.a>
                      <motion.a
                        href={project.github}
                        className="project-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                  <div className="project-category">
                    <ProjectIcon size={16} />
                    {project.category}
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-features">
                    {project.features.map((feature, featureIndex) => (
                      <motion.span
                        key={feature}
                        className="project-feature"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 + featureIndex * 0.05 }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 + techIndex * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3>Ready to collaborate on your next project?</h3>
          <p>Let's work together to ensure your software meets the highest quality standards</p>
          <motion.a
            href="https://www.linkedin.com/in/aniket-shikhare/"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={20} />
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 