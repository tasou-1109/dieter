import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import "../scss/detaDetail.scss";
import { Header } from "../header/Header";

export const DataDetail = () => {
  const data = useLocation();
  const menus = data.state.menus;
  const deleteId = menus.record_id;
  const day = menus.day;

  const nav = useNavigate();

  const handleEdit = () => {
    nav(`/dieter/Edit/${day}`, {
      state: { menus: menus },
    });
  };

  const handleDataDelete = async () => {
    try {
      await supabase.from("record").delete().eq("record_id", deleteId);
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="">
      <Header title={"記録詳細ページ"} />

      <main className="main">
        <h3>
          日付：
          <br />
          <div className="main__day">{menus.day}</div>
        </h3>

        <h3>
          筋トレセット名：
          <br />
          <div className="main__review">{menus.set_name}</div>
        </h3>

        <h3>
          食事内容：
          <br />
          <div className="main__detail">{menus.meal}</div>
        </h3>

        <h3>
          現在体重：
          <br />
          <div className="main__review-url">{menus.weight}kg</div>
        </h3>
      </main>

      <footer>
        <button onClick={() => handleEdit()}>編集へ</button>
        <button onClick={() => handleDataDelete()}>削除</button>
      </footer>
    </div>
  );
};
