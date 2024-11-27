import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

export const TrainingDetail = () => {
  const data = useLocation();
  const workOut = data.state.workOut;
  const delete_id = workOut.workout_id;

  const nav = useNavigate();

  const moveTrainingEdit = () => {
    nav(`/dieter/TrainingEdit/${workOut.workout_id}`, {
      state: { workOut: workOut },
    });
  };

  const detaDelete = async () => {
    try {
      await supabase.from("workout_menu").delete().eq("workout_id", delete_id);
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="">
      {console.log(workOut)}
      <header className="header">
        <h1>筋トレセット詳細ページ</h1>
        {/* <button onClick={(e) => handleHome(e)} className="header__signOut">
          ホームへ
        </button> */}
      </header>

      <main className="main">
        <h3>
          筋トレセット名：
          <br />
          <div className="main__review">{workOut.name}</div>
        </h3>

        <h3>
          １：
          <br />
          <div className="main__detail">{workOut.menu1}</div>
        </h3>

        <h3>
          ２：
          <br />
          <div className="main__review-url">{workOut.menu2}kg</div>
        </h3>
        <h3>
          ３：
          <br />
          <div className="main__review-url">{workOut.menu3}kg</div>
        </h3>
        <h3>
          ４：
          <br />
          <div className="main__review-url">{workOut.menu4}kg</div>
        </h3>
      </main>

      <footer>
        <button onClick={() => moveTrainingEdit()}>編集へ</button>
        <button onClick={() => detaDelete()}>削除</button>
      </footer>
    </div>
  );
};
