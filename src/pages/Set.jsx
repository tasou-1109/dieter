import React, { useEffect, useState } from "react";
import "./set.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { supabase } from "../supabase";

export const Set = () => {
  const nav = useNavigate();
  //userId取得
  const YoteiState = useLocation();
  const userId = YoteiState.state.id;
  const date = YoteiState.state.date;
  const userName = YoteiState.state.userName;

  //APIでデータを取得する
  // const [menu, setMenu] = useState(["a"]);

  const kin = [];
  var weight = null;
  var meal = null;

  const handleHome = () => {
    nav("/dieter");
  };

  const handleKinSet1 = (e) => {
    kin[0] = e.target.value;
    // console.log(kin[0]);
  };
  const handleKinSet2 = (e) => {
    kin[1] = e.target.value;
    // console.log(kin[0]);
  };
  const handleKinSet3 = (e) => {
    kin[2] = e.target.value;
    // console.log(kin[0]);
  };

  const handleMealSet = (e) => {
    meal = e.target.value;
    // console.log(meal);
  };

  const handleWeightChange = (e) => {
    weight = e.target.value;
    // console.log(weight);
  };

  const handleDataSet = async () => {
    try {
      const { data, error } = await supabase.from("record").insert([
        {
          user_id: userId,
          day: date,
          kin_menu1: kin[0],
          kin_menu2: kin[1],
          kin_menu3: kin[2],
          meal: meal,
          weight: weight,
          user_Name: userName,
        },
      ]);
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>記録ページ</h1>
        <button onClick={(e) => handleHome(e)} className="header__signOut">
          ホームへ
        </button>
      </header>
      <div className="main">
        <h1 className="title">記録</h1>
        <label className="training__label">トレーニング内容</label>
        <br />
        1:
        <input
          type="text"
          onChange={(e) => handleKinSet1(e)}
          // list="training__list"
          className="training__choice"
        />
        <br />
        2:
        <input
          type="text"
          onChange={(e) => handleKinSet2(e)}
          // list="training__list"
          className="training__choice"
        />
        <br />
        3:
        <input
          type="text"
          onChange={(e) => handleKinSet3(e)}
          // list="training__list"
          className="training__choice"
        />
        <br />
        {/* <datalist id="training__list">
          {menu.map((menu) => {
            return <option key={menu}>{menu}</option>;
          })}
        </datalist> */}
        <br />
        <label className="meal__title">食事内容</label>
        <br />
        <textarea
          onChange={(e) => handleMealSet(e)}
          className="meal__set"
        ></textarea>
        <br />
        <label className="body__weight">現在体重</label>
        <br />
        <input
          type="text"
          onChange={(e) => handleWeightChange(e)}
          className="body__weight-set"
        />
        kg
        <br />
        <button onClick={(e) => handleDataSet()} className="Set__button">
          記録
        </button>
      </div>
    </div>
  );
};
