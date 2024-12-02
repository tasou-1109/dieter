import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../scss/edit.scss";

export const Edit = () => {
  const nav = useNavigate();

  const data = useLocation();
  const menus = data.state.menus;

  const kin = [];
  kin[0] = menus.kin_menu1;
  kin[1] = menus.kin_menu2;
  kin[2] = menus.kin_menu3;
  var meal = menus.meal;
  var weight = menus.weight;

  const handleHome = () => {
    nav("/dieter");
  };

  const handleKinEdit1 = (e) => {
    kin[0] = e.target.value;
    console.log(kin[0]);
  };
  const handleKinEdit2 = (e) => {
    kin[1] = e.target.value;
    console.log(kin[1]);
  };
  const handleKinEdit3 = (e) => {
    kin[2] = e.target.value;
    console.log(kin[2]);
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
    console.log(kin[0]);
    try {
      const { data, error } = await supabase
        .from("record")
        .update([
          {
            // day: menus.day,
            kin_menu1: kin[0],
            kin_menu2: kin[1],
            kin_menu3: kin[2],
            meal: meal,
            // record_id: menus.record_id,
            // user_Name: menus.user_Name,
            user_id: menus.user_Id,
            weight: weight,
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
        1:
        <input
          type="text"
          onChange={(e) => handleKinEdit1(e)}
          // list="training__list"
          defaultValue={kin[0]}
          className="training__choice"
        />
        <br />
        2:
        <input
          type="text"
          onChange={(e) => handleKinEdit2(e)}
          // list="training__list"
          defaultValue={kin[1]}
          className="training__choice"
        />
        <br />
        3:
        <input
          type="text"
          onChange={(e) => handleKinEdit3(e)}
          // list="training__list"
          defaultValue={kin[2]}
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
