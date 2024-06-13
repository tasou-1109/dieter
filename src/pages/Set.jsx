import React, { useEffect, useState } from "react";
import "./set.scss";
import { useLocation } from "react-router-dom";
import { Header } from "../header/Header";
import { supabase } from "../supabase";

export const Set = () => {
  //userId取得
  const YoteiState = useLocation();
  const userId = YoteiState.state.id;

  //APIでデータを取得する
  const [menu, setMenu] = useState(["a"]);

  const [kin, setKin] = useState([]);
  const [weight, setWeight] = useState(70);
  const [meal, setMeal] = useState();

  const handleKinSet1 = (e) => setKin([...kin, e.target.value]);
  const handleKinSet2 = (e) => setKin([...kin, e.target.value]);
  const handleKinSet3 = (e) => setKin([...kin, e.target.value]);

  const handleMealSet = (e) => setMeal(e.target.value);

  const handleWeightChange = (e) => setWeight(e.target.value);

  const handleDataSet = async () => {
    const { data, error } = await supabase.from("record").insert({
      user_id: userId,
      day: new Date(),
      kin_menu1: kin[0],
      kin_menu2: kin[1],
      kin_menu13: kin[2],
      meal: meal,
      weight: weight,
    });
    // .select();
  };

  return (
    <>
      <Header />
      <div className="set-main">
        <h1 className="title">記録</h1>
        <label className="training__label">トレーニング内容</label>
        <br />
        1:
        <input
          type="text"
          onChange={(e) => handleKinSet1(e)}
          list="training__list"
          className="training__choice"
        />
        <br />
        2:
        <input
          type="text"
          onChange={(e) => handleKinSet2(e)}
          list="training__list"
          className="training__choice"
        />
        <br />
        3:
        <input
          type="text"
          onChange={(e) => handleKinSet3(e)}
          list="training__list"
          className="training__choice"
        />
        <br />
        <datalist id="training__list">
          {menu.map((menu) => {
            return <option key={menu}>{menu}</option>;
          })}
        </datalist>
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
    </>
  );
};

export default Set;
