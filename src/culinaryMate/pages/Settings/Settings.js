// src/culinaryMate/pages/Settings/Settings.js
import React from 'react';
import { motion } from 'framer-motion';
import './Settings.css';

const Settings = ({ toggleDarkMode }) => {
  return (
    <div className="page settings">
      <div className="content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          設定
        </motion.h1>
        <div className="settings-container">
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>アプリケーション設定</h3>
            <div className="settings-item">
              <label>ダークモード</label>
              <button onClick={toggleDarkMode}>切り替え</button>
            </div>
            <div className="settings-item">
              <label>言語設定</label>
              <select>
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="settings-item">
              <label>通知設定</label>
              <input type="checkbox" />
            </div>
          </motion.div>
          
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>アカウント設定</h3>
            <div className="settings-item">
              <label>メールアドレス</label>
              <input type="email" placeholder="メールアドレスを入力" />
            </div>
            <div className="settings-item">
              <label>パスワード変更</label>
              <button>変更する</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;