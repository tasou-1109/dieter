import React, { use, useEffect, useState } from "react";
import "../scss/set.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { supabase } from "../../supabase";

export const Set = () => {
  //ページ移動機能
  const nav = useNavigate();

  //データ取得
  const YoteiState = useLocation(); //Yoteiファイルからのデータ取得
  const user_id = YoteiState.state.id; //userId取得
  const date = YoteiState.state.date; //日付取得
  const user_name = YoteiState.state.user_name; //ユーザ名取得

  const [training, setTraining] = useState([]);

  //トレーニングメニューセットの取得
  const getTrainingSet = async () => {
    try {
      const { data, error } = await supabase
        .from("workout_menu")
        .select("*")
        .eq("user_name", user_name);

      console.log(data);
      setTraining(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    console.log(user_id);
    if (user_name != null) {
      getTrainingSet();
    }
  }, [user_name]);

  //homeへのページ遷移
  const handleHome = () => {
    nav("/dieter");
  };

  var set_name = null;
  const handleSetName = (e) => {
    set_name = e.target.value;
  };

  var meal = null; //初期値
  //食事内容の格納
  const handleMealSet = (e) => {
    meal = e.target.value;
  };

  var weight = null; //初期値
  //体重の格納
  const handleWeightChange = (e) => {
    weight = e.target.value;
  };

  //記録データの登録
  const handleDataSet = async () => {
    try {
      const { data, error } = await supabase.from("record").insert([
        {
          user_id: user_id,
          day: date,
          meal: meal,
          weight: weight,
          user_name: user_name,
          set_name: set_name,
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
        <label className="training__label">セットを選択してください</label>
        <select onChange={(e) => handleSetName(e)}>
          <option value={""}></option>
          {training.map((training) => (
            <option key={training}>{training.name}</option>
          ))}
        </select>
        <br />
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
