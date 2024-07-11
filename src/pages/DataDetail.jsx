import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./detaDetail.scss";

export const DataDetail = () => {
  const data = useLocation();
  const userId = data.state.userId;
  const userName = data.state.userName;
  const menus = data.state.menus;
  const deleteId = menus.record_id;
  const day = menus.day;

  // const [menus, setMenus] = useState([]);

  const nav = useNavigate();

  // const getData = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("record")
  //       .select("*")
  //       .eq("user_Name", userName)
  //       .eq("day", day);

  //     // setMenus(data);
  //     menus = data;
  //     console.log(data);
  //     console.log(menus);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (menus.length == 0) {
  //     getData();
  //     // console.log(menus[0]);
  //   }
  //   console.log(menus);
  // }, [menus]);

  const handleHome = () => {
    nav("/dieter");
  };

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
    <div>
      {console.log(menus)}
      <header className="header">
        <h1>記録詳細ページ</h1>
        <button onClick={(e) => handleHome(e)} className="header__signOut">
          ホームへ
        </button>
      </header>

      <main className="main">
        <h3>
          日付：
          <br />
          <div className="main__day">{menus.day}</div>
        </h3>

        <h3>
          筋トレメニュー１：
          <br />
          <div className="main__review">{menus.kin_menu1}</div>
        </h3>

        <h3>
          筋トレメニュー２：
          <br />
          <div className="main__review">{menus.kin_menu2}</div>
        </h3>

        <h3>
          筋トレメニュー３：
          <br />
          <div className="main__review">{menus.kin_menu3}</div>
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
