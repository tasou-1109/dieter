// src/culinaryMate/pages/FoodManagement/FoodManagement.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FoodForm from './FoodForm';
import FoodList from './FoodList';
import RecipeSuggestion from './RecipeSuggestion';
import useFood from '../../hooks/useFood';
import './FoodManagement.css';

const FoodManagement = () => {
  const {
    foods,
    loading,
    error,
    addFood,
    updateFood,
    deleteFood,
    getNearExpiryFoods
  } = useFood();

  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodSubmit = (foodData) => {
    if (selectedFood) {
      updateFood({ ...foodData, id: selectedFood.id });
      setSelectedFood(null);
    } else {
      addFood(foodData);
    }
  };

  const handleFoodDelete = (foodId) => {
    deleteFood(foodId);
    if (selectedFood && selectedFood.id === foodId) {
      setSelectedFood(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page food-management">
      <div className="content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          食材管理
        </motion.h1>
        <div className="food-management-container">
          <FoodForm
            selectedFood={selectedFood}
            onSubmit={handleFoodSubmit}
            onCancel={() => setSelectedFood(null)}
          />
          <FoodList
            foods={foods}
            onFoodSelect={setSelectedFood}
            onFoodDelete={handleFoodDelete}
          />
          <RecipeSuggestion nearExpiryFoods={getNearExpiryFoods()} />
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;