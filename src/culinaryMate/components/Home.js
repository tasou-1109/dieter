// Home.js
import React, { useEffect, useState } from "react";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import RecipeSuggestion from "./RecipeSuggestion";
import { useFood } from "../hooks/useFood";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const { handleLogout } = useAuth();
  const [foodList, setFoodList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const {
    foodName,
    setFoodName,
    expiryDate,
    setExpiryDate,
    foodCount,
    setFoodCount,
    editingFood,
    fetchFoodList,
    insertData,
    updateFood,
    resetForm,
    deleteFood,
    startEditing,
  } = useFood();

  useEffect(() => {
    const loadFoodList = async () => {
      const list = await fetchFoodList();
      setFoodList(list);
    };
    loadFoodList();
  }, [fetchFoodList]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedList = [...foodList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setFoodList(sortedList);
  };

  const handleInsertOrUpdate = async () => {
    let success;
    if (editingFood) {
      success = await updateFood();
    } else {
      success = await insertData();
    }
    if (success) {
      const updatedList = await fetchFoodList();
      setFoodList(updatedList);
    }
  };

  const handleDelete = async (record_id) => {
    const success = await deleteFood(record_id);
    if (success) {
      const updatedList = await fetchFoodList();
      setFoodList(updatedList);
    }
  };

  return (
    <div className="App-content">
      <h1 className="App-title">Home</h1>
      <button className="App-button" onClick={handleLogout}>
        ログアウト
      </button>
      <button onClick={() => nav("/dieter")}></button>
      <FoodForm
        foodName={foodName}
        setFoodName={setFoodName}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        foodCount={foodCount}
        setFoodCount={setFoodCount}
        editingFood={editingFood}
        insertOrUpdateData={handleInsertOrUpdate}
        resetForm={resetForm}
      />
      <FoodList
        foodList={foodList}
        sortConfig={sortConfig}
        requestSort={requestSort}
        startEditing={startEditing}
        deleteFood={handleDelete}
      />
      <RecipeSuggestion />
    </div>
  );
};

export default Home;
