// src/culinaryMate/pages/FoodManagement/RecipeSuggestion.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useRecipe from '../../hooks/useRecipe';

const RecipeSuggestion = ({ nearExpiryFoods }) => {
  const [recipeQuery, setRecipeQuery] = useState('');
  const { generateRecipe, loading, recipe } = useRecipe();

  const handleRecipeSearch = async () => {
    const ingredients = nearExpiryFoods.map(food => food.name).join(', ');
    const prompt = `以下の食材を使用したレシピの提案をお願いします：${ingredients}\n追加の要望：${recipeQuery}`;
    await generateRecipe(prompt);
  };

  return (
    <motion.div
      className="recipe-suggestion"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2>レシピ提案</h2>
      <div className="recipe-search">
        <textarea
          className="recipe-textarea"
          value={recipeQuery}
          onChange={(e) => setRecipeQuery(e.target.value)}
          placeholder="レシピの要望を入力してください（例：簡単な和食、ヘルシーな料理など）"
        />
        <button 
          className="recipe-button" 
          onClick={handleRecipeSearch}
          disabled={loading}
        >
          {loading ? 'レシピを生成中...' : 'レシピを検索'}
        </button>
      </div>
      
      {nearExpiryFoods.length > 0 && (
        <div className="suggestion-content">
          <h3>賞味期限が近い食材</h3>
          <div className="expiring-foods">
            {nearExpiryFoods.map(food => (
              <div key={food.id} className="expiring-food-item">
                <p>
                  {food.name} (期限: {new Date(food.expiryDate).toLocaleDateString()})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recipe && (
        <div className="recipe-result">
          <h3>提案レシピ</h3>
          <div className="recipe-content">
            {recipe.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RecipeSuggestion;