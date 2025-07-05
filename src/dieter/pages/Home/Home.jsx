import React, { useState, useEffect } from "react";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import { HomeHeader } from "../../header/HomeHeader";
import { useNavigate } from "react-router-dom";
import { Select_work_out } from "../../api_Connect/Select_work_out";
import { getSessionDetail } from "../../api_Connect/authAPI"; // 変更
import Bubbles from "../../../culinaryMate/components/Animations/Bubbles";
import Wave from "../../../culinaryMate/components/Animations/WaveAnimation";

export const Home = () => {
  const nav = useNavigate();
  const [auth, setAuth] = useState(null);

  const [userId, setUserId] = useState(null);
  const [user_name, setUser_name] = useState(null);

  //トレーニングメニュー
  const [workOut, setWorkOut] = useState([]);

  const getLogin = async () => {
    const session = await getSessionDetail();
    if (session) {
      setAuth(session.session);
      setUserId(session.user_id);
      setUser_name(session.user_name);
      setWorkOut(await Select_work_out(session.user_name));
    } else {
      alert("未ログインで続行します");
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const handleSetRoute = () => {
    nav("/TrainingMenus", {
      state: { workOut: workOut },
    });
  };

  return (
    <div>
      <HomeHeader />
      <main className="main">
        <Yotei
          user_id={userId}
          auth={auth}
          user_name={user_name}
          workOut={workOut}
        />
        <br />
        <div className="main__mem">
          <Training user_id={userId} auth={auth} user_name={user_name} />
          <br />
          <button onClick={() => handleSetRoute()} className="training__button">
            筋トレメニュー一覧へ
          </button>
        </div>
        <Bubbles />
        <Wave />
      </main>
    </div>
  );
};
