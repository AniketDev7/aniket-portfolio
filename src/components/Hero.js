import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowDown, Mouse, Zap, Shield } from 'lucide-react';
import { getIcon } from '../utils/iconMapping';
import portfolioData from '../data/portfolioData.json';
import './Hero.css';

const Hero = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedCard, setFocusedCard] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { hero, personal } = portfolioData;
  const fullText = hero.typingText;
  const typingSpeed = 100;

  useEffect(() => {
    if (inView && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, inView, fullText]);

  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-background">
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                x: [0, Math.random() * 1000],
                y: [0, Math.random() * 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="wave">👋</span> {hero.greeting}
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="gradient-text">{personal.name}</span>
            </motion.h1>

            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="typing-text">{text}</span>
              <span className="cursor">|</span>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {hero.description}
            </motion.p>

            {personal.description && (
              <motion.p
                className="hero-headline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {personal.description}
              </motion.p>
            )}

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={20} />
                View Projects
              </motion.a>
              
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield size={20} />
                Connect on LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {hero.floatingCards.map((card, index) => {
              const IconComponent = getIcon(card.icon);
              const isFocused = focusedCard === index;
              return (
                <div
                  key={card.title}
                  role="button"
                  tabIndex={0}
                  className={`floating-card ${index > 0 ? `delay-${index}` : ''} ${isFocused ? 'focused' : ''}`}
                  onClick={() => setFocusedCard(isFocused ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setFocusedCard(isFocused ? null : index);
                    }
                  }}
                >
                  <div className="card-content">
                    <IconComponent className="card-icon" />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToAbout}
        >
          <Mouse className="mouse-icon" />
          <span>Scroll to explore</span>
          <ArrowDown className="arrow-icon" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 