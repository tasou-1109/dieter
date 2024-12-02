// src/culinaryMate/hooks/useFood.js
import { useState, useEffect } from 'react';

const useFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'culinaryMate_foods';

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
    }
  }, [foods, loading]);

  const loadFoods = () => {
    try {
      const storedFoods = localStorage.getItem(STORAGE_KEY);
      if (storedFoods) {
        setFoods(JSON.parse(storedFoods));
      }
      setLoading(false);
    } catch (err) {
      setError('食材データの読み込みに失敗しました');
      setLoading(false);
    }
  };

  const addFood = (newFood) => {
    setFoods(prevFoods => [...prevFoods, { ...newFood, id: Date.now() }]);
  };

  const updateFood = (updatedFood) => {
    setFoods(prevFoods =>
      prevFoods.map(food =>
        food.id === updatedFood.id ? updatedFood : food
      )
    );
  };

  const deleteFood = (foodId) => {
    setFoods(prevFoods => prevFoods.filter(food => food.id !== foodId));
  };

  const getNearExpiryFoods = (days = 3) => {
    return foods.filter(food => {
      const expiryDate = new Date(food.expiryDate);
      const daysUntilExpiry = Math.ceil(
        (expiryDate - new Date()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExpiry <= days && daysUntilExpiry >= 0;
    });
  };

  return {
    foods,
    loading,
    error,
    addFood,
    updateFood,
    deleteFood,
    getNearExpiryFoods
  };
};

export default useFood;