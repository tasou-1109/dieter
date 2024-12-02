// useAuth.js
import { useState, useEffect } from "react";
import { supabase } from "../../supabase"; // パスを修正

export const useAuth = () => {
  const [foodList, setFoodList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchFoodList();
  }, []);

  const fetchFoodList = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      alert("ユーザー情報の取得に失敗しました: " + userError.message);
      return;
    }

    if (!user) {
      alert("ユーザーがログインしていません");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setFoodList(data.map((item, index) => ({ ...item, order: index + 1 })));
    } catch (error) {
      alert("データの取得に失敗しました: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert("ログアウトしました");
    } catch (error) {
      alert("ログアウトに失敗しました: " + error.message);
    }
  };

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

  return {
    foodList,
    sortConfig,
    fetchFoodList,
    handleLogout,
    requestSort,
  };
};
