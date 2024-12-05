// src/culinaryMate/pages/Home/Home.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page home">
      <div className="content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          マッスルバランス
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          トレーニングと食事管理を一元化したアプリケーション
        </motion.p>
        <div className="features">
          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => navigate("/dieter")}
            style={{ cursor: "pointer" }}
          >
            <h3>トレーニング記録</h3>
            <p>日々のワークアウトを簡単に記録</p>
          </motion.div>
          <motion.div
            className="feature-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() =>
              navigate("/culinaryMate", { state: { page: "food" } })
            }
            style={{ cursor: "pointer" }}
          >
            <h3>食事管理</h3>
            <p>栄養バランスを可視化</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
