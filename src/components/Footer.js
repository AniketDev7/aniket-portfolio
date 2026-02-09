import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Heart, ArrowUp, ExternalLink, Eye } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import './Footer.css';

const COUNTAPI_NAMESPACE = 'aniket-portfolio';
const COUNTAPI_KEY = 'visits';

// CountAPI doesn't support CORS; use a proxy so it works from GitHub Pages
const countApiUrl = (path) =>
  `https://corsproxy.io/?${encodeURIComponent(`https://api.countapi.xyz${path}`)}`;

const Footer = () => {
  const [visitCount, setVisitCount] = useState(null);
  const [visitError, setVisitError] = useState(false);

  useEffect(() => {
    const hasCountedThisSession = sessionStorage.getItem('portfolio_visit_counted');
    const path = `/${hasCountedThisSession ? 'get' : 'hit'}/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`;
    fetch(countApiUrl(path))
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.value === 'number') {
          setVisitCount(data.value);
          if (!hasCountedThisSession) sessionStorage.setItem('portfolio_visit_counted', '1');
        } else {
          setVisitError(true);
        }
      })
      .catch(() => setVisitError(true));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { personal, footer } = portfolioData;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand">
              <Code className="brand-icon" />
              <span className="brand-text">{personal.name}</span>
            </div>
            <p className="brand-description">
              {footer.description}
            </p>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-services"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Services</h4>
            <ul>
              {footer.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4>Contact Info</h4>
            <a href={`mailto:${personal.email}`} className="footer-contact-link">Send a message <ExternalLink size={14} /></a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="footer-contact-link">Connect on LinkedIn <ExternalLink size={14} /></a>
            <p>{personal.location}</p>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-line"></div>
          <div className="footer-bottom-content">
            <p>
              © 2026 {personal.name}. Made with <Heart className="heart-icon" /> and lots of coffee
              <span className="footer-visit-count">
                {' · '}
                <Eye size={14} className="visit-icon" />
                {visitCount != null
                  ? `${visitCount.toLocaleString()} visits`
                  : visitError
                    ? '— visits'
                    : '… visits'}
              </span>
            </p>
            <motion.button
              className="scroll-top-btn"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 