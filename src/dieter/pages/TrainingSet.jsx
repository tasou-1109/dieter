import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { Header } from "../header/Header";

export const TrainingSet = () => {
  const nav = useNavigate();

  const location = useLocation();
  const user_id = location.state.user_id;
  const user_name = location.state.user_name;
  console.log(user_name);

  var menuName;
  var workOut_menu1;
  var workOut_menu2;
  var workOut_menu3;
  var workOut_menu4;

  const handleSetName = (e) => {
    menuName = e.target.value;
  };

  const handleTrainingSet_1 = (e) => {
    workOut_menu1 = e.target.value;
  };
  const handleTrainingSet_2 = (e) => {
    workOut_menu2 = e.target.value;
  };
  const handleTrainingSet_3 = (e) => {
    workOut_menu3 = e.target.value;
  };
  const handleTrainingSet_4 = (e) => {
    workOut_menu4 = e.target.value;
  };

  const handleDataSet = async () => {
    try {
      await supabase.from("workout_menu").insert([
        {
          user_id: user_id,
          name: menuName,
          menu1: workOut_menu1,
          menu2: workOut_menu2,
          menu3: workOut_menu3,
          menu4: workOut_menu4,
          user_name: user_name,
        },
      ]);
      alert("記録完了");
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header title={"筋トレセットページ"} />

      <div className="main">
        <h1 className="title">メニュー</h1>
        <label className="training__label"></label>
        <br />
        セット名
        <input
          type="text"
          onChange={(e) => handleSetName(e)}
          className="training__choice"
        />
        <br />
        1:
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
