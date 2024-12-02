// src/components/PageTransition.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();

  const handleAnimationStart = () => {
    const canvas = document.querySelector('.bubbles-canvas');
    if (canvas) {
      canvas.style.opacity = '0';
    }
  };

  const handleAnimationComplete = () => {
    const canvas = document.querySelector('.bubbles-canvas');
    if (canvas) {
      canvas.style.opacity = '1';
    }
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;