// useFood.js
import { useState, useCallback } from "react";
import { supabase } from "../../supabase";

export const useFood = () => {
  const [foodName, setFoodName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [foodCount, setFoodCount] = useState(0);
  const [editingFood, setEditingFood] = useState(null);

  const fetchFoodList = useCallback(async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      alert("ユーザー情報の取得に失敗しました: " + userError.message);
      return [];
    }

    if (!user) {
      alert("ユーザーがログインしていません");
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data.map((item, index) => ({ ...item, order: index + 1 }));
    } catch (error) {
      alert("データの取得に失敗しました: " + error.message);
      return [];
    }
  }, []);

  const insertData = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("ユーザー情報の取得に失敗しました");
      return false;
    }

    try {
      const { error } = await supabase.from("foods").insert([
        {
          user_id: user.id,
          food_name: foodName,
          expiry_date: expiryDate,
          food_count: foodCount,
        },
      ]);

      if (error) throw error;
      alert("データを追加しました");
      resetForm();
      return true;
    } catch (error) {
      alert("データの追加に失敗しました: " + error.message);
      return false;
    }
  };

  const updateFood = async () => {
    if (!editingFood || !editingFood.record_id) {
      console.error("Invalid record_id for update");
      return false;
    }
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        alert("ユーザー情報の取得に失敗しました");
        return false;
      }

      const { error } = await supabase
        .from("foods")
        .update({
          food_name: foodName,
          expiry_date: expiryDate,
          food_count: foodCount,
        })
        .eq("record_id", editingFood.record_id)
        .eq("user_id", user.id);

      if (error) throw error;
      alert("データを更新しました");
      resetForm();
      return true;
    } catch (error) {
      alert("データの更新に失敗しました: " + error.message);
      return false;
    }
  };

  const deleteFood = async (record_id) => {
    if (!record_id) {
      console.error("Invalid record_id for deletion");
      return false;
    }
    try {
      const { error } = await supabase
        .from("foods")
        .delete()
        .eq("record_id", record_id);
      if (error) throw error;
      alert("データを削除しました");
      return true;
    } catch (error) {
      alert("データの削除に失敗しました: " + error.message);
      return false;
    }
  };

  const startEditing = (food) => {
    setEditingFood(food);
    setFoodName(food.food_name);
    setExpiryDate(food.expiry_date);
    setFoodCount(food.food_count);
  };

  const resetForm = () => {
    setEditingFood(null);
    setFoodName("");
    setExpiryDate("");
    setFoodCount(0);
  };

  return {
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
    deleteFood,
    startEditing,
    resetForm,
  };
};
