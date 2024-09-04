import React, { useEffect, useState } from "react";
//import "./training.scss";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export const Training = (info) => {
  const userId = info["userId"];
  const auth = info["auth"];
  const userName = info["userName"];

  const [menus, setMenus] = useState([]);

  const nav = useNavigate();

  //ここでuseEffectを使用しデータを取得する
  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("record")
        .select("*")
        .eq("user_Name", userName)
        .order("day", { ascending: false })
        .limit(14);

      console.log(data);
      setMenus(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (userName != null) {
      getData();
    }
  }, [userName]);

  // const seikei = menu.map((menu) => ({
  //   limit: new Date(menu.day.slice(0, 7)),
  // }));

  // const seikei2 = seikei.map((seikei) => ({
  //   hyouji:
  //     seikei.limit.getFullYear() +
  //     "年" +
  //     seikei.limit.getMonth() +
  //     "月" +
  //     seikei.limit.getDate() +
  //     "日 ",
  // }));

  // console.log(seikei2);

  const handleDetail = (date, menu) => {
    console.log(date, menu);
    nav(`/dieter/Detail/${date}`, {
      state: { menus: menu, userId: userId, userName: userName },
    });
  };

  return (
    <>
      <h2 className="training__title">記録一覧</h2>
      <ul className="training__ul" role="tablist">
        {menus.map((menu, key) => {
          return (
            <>
              <li id="list" key={key} className="training__list">
                {menu.day}&nbsp;&nbsp;
                {menu.weight}kg&nbsp;&nbsp;
                {menu.kin_menu1}&nbsp;
                {menu.kin_menu2}&nbsp;
                {menu.kin_menu3}&nbsp;&nbsp;
              </li>
              {/* {console.log(menu)} */}
              <button
                onClick={() => handleDetail(menu.day, menu)}
                className="training__button"
              >
                詳細へ
              </button>
            </>
          );
        })}
      </ul>
    </>
  );
};
