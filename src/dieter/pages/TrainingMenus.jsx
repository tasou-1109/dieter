import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { deleteTraining } from "../api_Connect/trainingAPI";
import Bubbles from "../../culinaryMate/components/Animations/Bubbles";
import WaveAnimation from "../../culinaryMate/components/Animations/WaveAnimation";

export const TrainingMenus = () => {
  const nav = useNavigate();

  const data = useLocation();
  const workOut = data.state.workOut;

  const moveTrainingEdit = (workOut_id, workOut_edit) => {
    nav(`/TrainingEdit/${workOut_id}`, {
      state: { workOut: workOut_edit },
    });
  };

  const moveTrainingDelete = () => {
    deleteTraining(workOut.workout_id);
    nav("/");
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
      <Bubbles />
      <WaveAnimation />
    </div>
  );
};
