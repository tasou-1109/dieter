// src/pages/About.js
import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const About = () => {
  return (
    <div className="page about">
      <div className="content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          アプリについて
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          健康的な生活をサポートするための総合フィットネス管理ツール
        </motion.p>
        <div className="about-content">
          <motion.div
            className="about-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>目的</h3>
            <p>トレーニングと食事管理を一元化し、より効果的な健康管理を実現します</p>
          </motion.div>
          <motion.div
            className="about-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>特徴</h3>
            <p>直感的なUI、詳細な分析機能、カスタマイズ可能な目標設定</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;