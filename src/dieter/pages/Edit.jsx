import { useLocation, useNavigate } from "react-router-dom";
import "../scss/edit.scss";
import { useState, useEffect } from "react";
import { Select_work_out } from "../api_Connect/Select_work_out";
import { updateRecord } from "../api_Connect/recordAPI"; // ここを修正
import { Header } from "../header/Header";
import Bubbles from "../../culinaryMate/components/Animations/Bubbles";
import WaveAnimation from "../../culinaryMate/components/Animations/WaveAnimation";

export const Edit = () => {
  const nav = useNavigate();

  const data = useLocation();
  const menus = data.state.menus;

  var set_name = menus.set_name;
  var meal = menus.meal;
  var weight = menus.weight;
  var user_name = menus.user_name;

  const [workOut, setWorkOut] = useState([]);

  const getWorkOutSet = async () => {
    setWorkOut(await Select_work_out(user_name));
  };

  useEffect(() => {
    getWorkOutSet();
  }, []);

  const handleSetEdit = (e) => {
    set_name = e.target.value;
  };

  const handleMealEdit = (e) => {
    meal = e.target.value;
  };
  const handleWeightEdit = (e) => {
    weight = e.target.value;
  };

  // recordAPIのupdateRecordを呼び出す形に修正
  const handleDataEdit = async () => {
    const updates = {
      meal: meal,
      user_id: menus.user_Id,
      weight: weight,
      set_name: set_name,
    };
    await updateRecord(updates, { record_id: menus.record_id });
    nav("/");
  };

  return (
    <div>
      <Header title={"記録編集ページ"} />
      <div className="main">
        <h1 className="title">記録編集</h1>
        <h4 className="workOut__label">トレーニング内容</h4>
        <label className="workOut__label">セット名を選択してください</label>
        <br />
        <select onChange={(e) => handleSetEdit(e)} className="workOut__choice">
          <option value={""} className="workOut__default-option">
            {set_name}
          </option>
          {workOut.map((workOut, key) => (
            <option key={key} className="workOut__choice-option">
              {workOut.name}
            </option>
          ))}
        </select>
        <br />
        <h4 className="meal__title">食事内容</h4>
        <textarea
          onChange={(e) => handleMealEdit(e)}
          defaultValue={meal}
          className="meal__set"
        ></textarea>
        <h4 className="body__weight">現在体重</h4>
        <input
          type="number"
          onChange={(e) => handleWeightEdit(e)}
          defaultValue={weight}
          className="body__weight-edit"
        />
        kg
        <br />
        <button onClick={(e) => handleDataEdit()} className="Set__button">
          記録
        </button>
      </div>
      <Bubbles />
      <WaveAnimation />
    </div>
  );
};
