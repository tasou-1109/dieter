// src/culinaryMate/pages/FoodManagement/FoodList.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FoodList = ({ foods, onFoodSelect, onFoodDelete }) => {
  const [sortBy, setSortBy] = useState('expiryDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const getSortedFoods = () => {
    return [...foods].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'expiryDate':
          comparison = new Date(a.expiryDate) - new Date(b.expiryDate);
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
        case 'order':
          comparison = a.id - b.id;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  return (
    <motion.div
      className="food-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="list-controls">
        <button className="sort-button" onClick={() => handleSort('order')}>
          登録順 {sortBy === 'order' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button className="sort-button" onClick={() => handleSort('name')}>
          食材名 {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button className="sort-button" onClick={() => handleSort('expiryDate')}>
          賞味期限 {sortBy === 'expiryDate' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button className="sort-button" onClick={() => handleSort('quantity')}>
          数量 {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <div className="food-grid">
        <AnimatePresence>
          {getSortedFoods().map((food, index) => (
            <motion.div
              key={food.id}
              className="food-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="food-number">{index + 1}</div>
              <h3>{food.name}</h3>
              <p>数量: {food.quantity}</p>
              <p>賞味期限: {new Date(food.expiryDate).toLocaleDateString()}</p>
              <div className="food-item-actions">
                <button onClick={() => onFoodSelect(food)}>編集</button>
                <button onClick={() => onFoodDelete(food.id)}>削除</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FoodList;