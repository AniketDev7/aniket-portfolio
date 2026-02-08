import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Linkedin } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import './Activity.css';

const Activity = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const activity = portfolioData.activity;
  if (!activity) return null;

  const { title, subtitle, linkedinProfile, posts } = activity;
  const hasPosts = posts && posts.length > 0;

  return (
    <section id="activity" className="activity" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </motion.div>

        {!hasPosts && (
          <motion.div
            className="activity-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="activity-empty-text">
              Add your <strong>Featured</strong> posts from LinkedIn here. On your profile, open the <strong>Featured</strong> section, click each post, copy the post URL, and add it in <code>src/data/portfolioData.json</code> under <code>activity.posts</code> with <code>title</code>, <code>excerpt</code>, <code>date</code>, and <code>link</code>.
            </p>
            <a
              href={linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-activity"
            >
              <Linkedin size={20} />
              Open my LinkedIn → Featured
            </a>
          </motion.div>
        )}

        {hasPosts && (
        <motion.div
          className="activity-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {posts.map((post, index) => (
            <motion.a
              key={post.title + index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="activity-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {post.image && (
                <div className="activity-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              <div className="activity-card-body">
                <span className="activity-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="activity-link">
                  View on LinkedIn <ExternalLink size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        )}

        {hasPosts && (
        <motion.div
          className="activity-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href={linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-activity"
          >
            <Linkedin size={20} />
            See featured & more on LinkedIn
          </a>
        </motion.div>
        )}
      </div>
    </section>
  );
};

export default Activity;
