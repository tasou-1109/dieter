import React, { useState, useEffect } from "react";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import { HomeHeader } from "../../header/HomeHeader";
import { supabase } from "../../../supabase";
import { useNavigate } from "react-router-dom";
import { Select_work_out } from "../../api_Connect/Select_work_out";
import Bubbles from "../../../culinaryMate/components/Animations/Bubbles";
import Wave from "../../../culinaryMate/components/Animations/WaveAnimation";

export const Home = () => {
  const nav = useNavigate();
  const [auth, setAuth] = useState(null);

  const [user, setUser] = useState(null);
  const [user_name, setUser_name] = useState(null);

  //トレーニングメニュー
  const [workOut, setWorkOut] = useState([]);

  const getLogin = async () => {
    const { data } = await supabase.auth.getSession(); //メソッドで非同期処理を行う

    if (data.session) {
      const a = await supabase.auth.getUser();
      setAuth(data.session.access_token);
      setUser(a.data.user.id);
      setUser_name(a.data.user.user_metadata.Name);
      setWorkOut(await Select_work_out(a.data.user.user_metadata.Name));
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const handleSetRoute = () => {
    nav("/dieter/TrainingMenus", {
      state: { workOut: workOut },
    });
  };

  console.log(workOut);

  return (
    <div>
      <HomeHeader />
      <main className="main">
        <Yotei
          user_id={user}
          auth={auth}
          user_name={user_name}
          workOut={workOut}
        />
        <br />
        <div className="main__mem">
          <Training user_id={user} auth={auth} user_name={user_name} />
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
