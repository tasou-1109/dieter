import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import "../scss/edit.scss";
import { useState, useEffect } from "react";

export const Edit = () => {
  const nav = useNavigate();

  const data = useLocation();
  const menus = data.state.menus;
  console.log(menus);

  var set_name = menus.set_name;
  var meal = menus.meal;
  var weight = menus.weight;
  var user_Name = menus.user_Name;

  const [training, setTraining] = useState([]);

  const getTrainingSet = async () => {
    try {
      const { data, error } = await supabase
        .from("workout_menu")
        .select("*")
        .eq("user_name", user_Name);

      console.log(data);
      setTraining(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTrainingSet();
  }, [user_Name]);

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
    //console.log(kin[0]);
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
      <header className="header">
        <h1>編集ページ</h1>
        <button onClick={(e) => handleHome(e)} className="header__signOut">
          ホームへ
        </button>
      </header>
      <div className="main">
        <h1 className="title">編集</h1>
        <label className="training__label">トレーニング内容</label>
        <br />
        <label className="training__label">セット名を選択してください</label>
        <select onChange={(e) => handleSetEdit(e)}>
          <option value={""}></option>
          {training.map((training, key) => (
            <option key={key}>{training.name}</option>
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
