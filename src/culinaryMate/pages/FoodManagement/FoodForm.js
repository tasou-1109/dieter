// src/culinaryMate/pages/FoodManagement/FoodForm.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FoodForm = ({ selectedFood, onSubmit, onCancel }) => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if (selectedFood) {
      setFoodName(selectedFood.name);
      setQuantity(selectedFood.quantity);
      setExpiryDate(selectedFood.expiryDate);
    } else {
      resetForm();
    }
  }, [selectedFood]);

  const resetForm = () => {
    setFoodName('');
    setQuantity('');
    setExpiryDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: foodName,
      quantity,
      expiryDate,
    });
    resetForm();
  };

  return (
    <motion.div
      className="food-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{selectedFood ? '食材を編集' : '新しい食材を追加'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="食材名"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="数量"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {selectedFood ? '更新' : '追加'}
        </button>
        {selectedFood && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default FoodForm;