import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

export const TrainingSet = () => {
  const nav = useNavigate();

  var menuName;
  var Training_menu1;
  var Training_menu2;
  var Training_menu3;
  var Training_menu4;

  const handleHome = () => {
    nav("/");
  };

  const handleSetName = (e) => {
    menuName = e.target.value;
  };

  const handleTrainingSet_1 = (e) => {
    Training_menu1 = e.target.value;
  };
  const handleTrainingSet_2 = (e) => {
    Training_menu2 = e.target.value;
  };
  const handleTrainingSet_3 = (e) => {
    Training_menu3 = e.target.value;
  };
  const handleTrainingSet_4 = (e) => {
    Training_menu4 = e.target.value;
  };

  const handleDataSet = () => {};

  return (
    <div>
      <header className="header">
        <h1>筋トレメニュー設定ページ</h1>
        <button onClick={(e) => handleHome(e)} className="header__signOut">
          ホームへ
        </button>
      </header>
      <div className="main">
        <h1 className="title">メニュー</h1>
        <label className="training__label"></label>
        <br />
        セット名
        <input
          type="text"
          onChange={(e) => handleTrainingSet_1(e)}
          className="training__choice"
        />
        <br />
        2:
        <input
          type="text"
          onChange={(e) => handleTrainingSet_2(e)}
          className="training__choice"
        />
        <br />
        3:
        <input
          type="text"
          onChange={(e) => handleTrainingSet_3(e)}
          className="training__choice"
        />
        <br />
        4:
        <input
          type="text"
          onChange={(e) => handleTrainingSet_4(e)}
          className="training__choice"
        />
        <br />
        <button onClick={(e) => handleDataSet()} className="Set__button">
          記録
        </button>
      </div>
    </div>
  );
};
