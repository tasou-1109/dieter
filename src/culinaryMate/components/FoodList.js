// FoodList.js
import React from "react";

const FoodList = ({ foodList, sortConfig, requestSort, startEditing, deleteFood }) => {
  return (
    <>
      <h2 className="App-title">登録済みの食品一覧</h2>
      <div>
        <button className="App-button" onClick={() => requestSort("order")}>
          登録順でソート
        </button>
        <button className="App-button" onClick={() => requestSort("food_name")}>
          食品名でソート
        </button>
        <button className="App-button" onClick={() => requestSort("expiry_date")}>
          賞味期限でソート
        </button>
        <button className="App-button" onClick={() => requestSort("food_count")}>
          数量でソート
        </button>
      </div>
      <table className="App-table">
        <thead>
          <tr>
            <th>登録順</th>
            <th>食品名</th>
            <th>賞味期限</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((food) => (
            <tr key={food.record_id}>
              <td>{food.order}</td>
              <td>{food.food_name}</td>
              <td>{food.expiry_date}</td>
              <td>{food.food_count}</td>
              <td>
                <button className="App-button" onClick={() => startEditing(food)}>
                  編集
                </button>
                <button className="App-button" onClick={() => deleteFood(food.record_id)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FoodList;