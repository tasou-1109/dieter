import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { useNavigate } from "react-router-dom";
import { Select_record } from "../../api_Connect/Select_record";

export const Training = (info) => {
  const user_id = info["user_id"];
  const auth = info["auth"];
  const user_name = info["user_name"];
  console.log(user_name);

  const [menus, setMenus] = useState([]);

  const nav = useNavigate();

  //ここでuseEffectを使用しデータを取得する
  const getData = async () => {
    setMenus(await Select_record(user_name));
  };

  useEffect(() => {
    if (user_id != null) {
      getData();
    }
  }, [user_id]);

  const handleDetail = (date, menu) => {
    console.log(date, menu);
    nav(`/dieter/Detail/${date}`, {
      state: { menus: menu, user_id: user_id, user_name: user_name },
    });
  };

  return (
    <>
      <h2 className="training__title">記録一覧</h2>
      <ul className="training__ul" role="tablist">
        {menus.map((menu, key) => {
          return (
            <label>
              <li id="list" key={key} className="training__list">
                {menu.day}&nbsp;&nbsp;
                {menu.weight}kg&nbsp;&nbsp;
                {menu.set_name}&nbsp;
              </li>
              <button
                onClick={() => handleDetail(menu.day, menu)}
                className="training__button"
              >
                詳細へ
              </button>
            </label>
          );
        })}
      </ul>
    </>
  );
};
