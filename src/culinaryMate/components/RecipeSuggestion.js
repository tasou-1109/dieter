// RecipeSuggestion.js
import React, { useState } from "react";
import { useRecipe } from "../hooks/useRecipe";

const RecipeSuggestion = () => {
  const [message, setMessage] = useState("");
  const { response, error, handleSendMessage } = useRecipe();

  return (
    <>
      <h2 className="App-title">献立提案</h2>
      <textarea
        className="App-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力してください"
      />
      <button className="App-button" onClick={() => handleSendMessage(message)}>
        送信
      </button>
      <div className="response-container">
        <h3>返答:</h3>
        <div className="response-content">
          {response}
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};

export default RecipeSuggestion;