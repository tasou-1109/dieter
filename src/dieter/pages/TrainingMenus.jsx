import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { Header } from "../header/Header";

export const TrainingMenus = () => {
  const nav = useNavigate();

  const data = useLocation();
  const workOut = data.state.workOut;
  console.log(workOut);

  const moveTrainingEdit = (workOut_id, workOut_edit) => {
    nav(`/dieter/TrainingEdit/${workOut_id}`, {
      state: { workOut: workOut_edit },
    });
  };

  const moveTrainingDelete = async (delete_id) => {
    try {
      await supabase.from("workout_menu").delete().eq("workout_id", delete_id);
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header title={"筋トレセット一覧ページ"} />
      <main className="main">
        <h2 className="training__title">セット一覧</h2>
        <ul className="training__ul" role="tablist">
          {workOut.map((workOut, key) => {
            return (
              <>
                <li id="list" key={key} className="training__list">
                  セット名：{workOut.name}
                  <br />
                  &nbsp;&nbsp;１：{workOut.menu1}
                  <br />
                  &nbsp;&nbsp;２：{workOut.menu2}
                  <br />
                  &nbsp;&nbsp;３：{workOut.menu3}
                  <br />
                  &nbsp;&nbsp;４：{workOut.menu4}
                  <br />
                </li>
                <button
                  onClick={() => moveTrainingEdit(workOut.workout_id, workOut)}
                  className="training__button"
                >
                  編集
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => moveTrainingDelete(workOut.workout_id)}
                  className="training__button"
                >
                  削除
                </button>
              </>
            );
          })}
        </ul>
      </main>
    </div>
  );
};
