import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! I will get back to you soon.');
    }, 2000);
  };

  const { personal, contact } = portfolioData;

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: personal.email,
      link: `mailto:${personal.email}`
    },
    // {
    //   icon: Phone,
    //   title: "Phone",
    //   value: personal.phone,
    //   link: `tel:${personal.phone.replace(/\s/g, '')}`
    // },
    {
      icon: MapPin,
      title: "Location",
      value: personal.location,
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, name: "LinkedIn", url: personal.linkedin, color: "#0077B5" },
    { icon: Github, name: "GitHub", url: personal.github, color: "#333" },
    { icon: Twitter, name: "Twitter", url: personal.twitter || null, color: "#1DA1F2" }
  ].filter((link) => link.url);

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text">{contact.title}</h2>
          <p className="section-subtitle">{contact.subtitle}</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Let's Connect</h3>
            <p>{contact.description}</p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <info.icon className="contact-icon" />
                  <div>
                    <h4>{info.title}</h4>
                    <span>{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ '--social-color': social.color }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="availability-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="availability-card">
            <h3>Current Availability</h3>
            <div className="availability-status">
              <div className="status-indicator available"></div>
              <span>{contact.availability.status}</span>
            </div>
            <p>{contact.availability.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 