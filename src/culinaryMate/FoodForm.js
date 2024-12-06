// FoodForm.js
import React from "react";

const FoodForm = ({
  foodName,
  setFoodName,
  expiryDate,
  setExpiryDate,
  foodCount,
  setFoodCount,
  editingFood,
  insertOrUpdateData,
  resetForm,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        insertOrUpdateData();
      }}
    >
      <input
        className="App-input"
        type="text"
        placeholder="食品名"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <input
        className="App-input"
        type="date"
        placeholder="賞味期限"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <input
        className="App-input"
        type="number"
        placeholder="数量"
        value={foodCount}
        onChange={(e) => setFoodCount(Number(e.target.value))}
      />
      <button className="App-button" type="submit">
        {editingFood ? "更新" : "追加"}
      </button>
      {editingFood && (
        <button className="App-button" type="button" onClick={resetForm}>
          キャンセル
        </button>
      )}
    </form>
  );
};

export default FoodForm;