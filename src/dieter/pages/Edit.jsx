import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import "../scss/edit.scss";
import { useState, useEffect } from "react";
import { Select_work_out } from "../api_Connect/Select_work_out";
import { Header } from "../header/Header";

export const Edit = () => {
  const nav = useNavigate();

  const data = useLocation();
  const menus = data.state.menus;

  var set_name = menus.set_name;
  var meal = menus.meal;
  var weight = menus.weight;
  var user_name = menus.user_name;
  console.log(user_name);

  const [workOut, setWorkOut] = useState([]);

  const getWorkOutSet = async () => {
    setWorkOut(await Select_work_out(user_name));
  };

  useEffect(() => {
    getWorkOutSet();
  }, []);

  const handleHome = () => {
    nav("/dieter");
  };

  const handleSetEdit = (e) => {
    set_name = e.target.value;
    console.log(set_name);
  };

  const handleMealEdit = (e) => {
    meal = e.target.value;
    console.log(meal);
  };
  const handleWeightEdit = (e) => {
    weight = e.target.value;
    console.log(weight);
  };

  const handleDataEdit = async () => {
    try {
      const { data, error } = await supabase
        .from("record")
        .update([
          {
            meal: meal,
            user_id: menus.user_Id,
            weight: weight,
            set_name: set_name,
          },
        ])
        .eq("record_id", menus.record_id)
        .select();
      console.log(data);
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header title={"記録編集ページ"} />
      <div className="main">
        <h1 className="title">編集</h1>
        <label className="workOut__label">トレーニング内容</label>
        <br />
        <label className="workOut__label">セット名を選択してください</label>
        <select onChange={(e) => handleSetEdit(e)}>
          <option value={""}>{set_name}</option>
          {workOut.map((workOut, key) => (
            <option key={key}>{workOut.name}</option>
          ))}
        </select>
        <br />
        <br />
        <label className="meal__title">食事内容</label>
        <br />
        <textarea
          onChange={(e) => handleMealEdit(e)}
          defaultValue={meal}
          className="meal__set"
        ></textarea>
        <br />
        <label className="body__weight">現在体重</label>
        <br />
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
    </div>
  );
};
