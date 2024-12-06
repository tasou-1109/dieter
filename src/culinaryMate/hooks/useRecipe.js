// src/culinaryMate/hooks/useRecipe.js
import { useState } from 'react';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

const useRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const generateRecipe = async (prompt) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'あなたは料理のプロフェッショナルです。与えられた食材を使用した具体的なレシピを提案してください。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }

      const data = await response.json();
      setRecipe(data.choices[0].message.content);
    } catch (err) {
      setError(err.message);
      console.error('Error generating recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    recipe,
    error,
    generateRecipe
  };
};

export default useRecipe;