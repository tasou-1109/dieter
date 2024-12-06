import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { Header } from "../header/Header";
import Bubbles from "../../culinaryMate/components/Animations/Bubbles";
import WaveAnimation from "../../culinaryMate/components/Animations/WaveAnimation";

export const TrainingEdit = () => {
  const data = useLocation();
  const workOut = data.state.workOut;
  console.log(workOut);
  const update_id = workOut.workout_id;
  var set_name = workOut.name;
  var menu1 = workOut.menu1;
  var menu2 = workOut.menu2;
  var menu3 = workOut.menu3;
  var menu4 = workOut.menu4;

  const nav = useNavigate();

  const handleNameEdit = (e) => {
    set_name = e.target.value;
  };

  const handleMenu1Edit = (e) => {
    menu1 = e.target.value;
  };
  const handleMenu2Edit = (e) => {
    menu2 = e.target.value;
  };
  const handleMenu3Edit = (e) => {
    menu3 = e.target.value;
  };
  const handleMenu4Edit = (e) => {
    menu4 = e.target.value;
  };

  const handleWorkOutEdit = async () => {
    try {
      const { data } = await supabase
        .from("workout_menu")
        .update([
          {
            name: set_name,
            menu1: menu1,
            menu2: menu2,
            menu3: menu3,
            menu4: menu4,
          },
        ])
        .eq("workout_id", update_id)
        .select();

      console.log(data);
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header title={"筋トレセット編集ページ"} />
      <div className="main">
        <h1 className="title">筋トレセット編集</h1>
        <label className="training__label">トレーニング内容</label>
        <br />
        <label className="training__label">セット名：</label>
        <input
          type="text"
          defaultValue={set_name}
          onChange={(e) => handleNameEdit(e)}
          className="training__choice"
        />
        <br />
        メニュー１：
        <input
          type="text"
          defaultValue={menu1}
          onChange={(e) => handleMenu1Edit(e)}
          className="training__choice"
        />
        <br />
        メニュー２：
        <input
          type="text"
          defaultValue={menu2}
          onChange={(e) => handleMenu2Edit(e)}
          className="training__choice"
        />
        <br />
        メニュー３：
        <input
          type="text"
          defaultValue={menu3}
          onChange={(e) => handleMenu3Edit(e)}
          className="training__choice"
        />
        <br />
        メニュー４：
        <input
          type="text"
          defaultValue={menu4}
          onChange={(e) => handleMenu4Edit(e)}
          className="training__choice"
        />
        <br />
        <button onClick={() => handleWorkOutEdit()} className="Set__button">
          記録
        </button>
      </div>
      <Bubbles />
      <WaveAnimation />
    </div>
  );
};
