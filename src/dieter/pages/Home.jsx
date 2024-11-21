import React, { useState, useEffect } from "react";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import { Header } from "../header/Header";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const nav = useNavigate();
  const [auth, setAuth] = useState(null);

  //トレーニングメニュー
  const [training, setTraining] = useState([]);

  const [user, setUser] = useState(null);
  const [user_name, setUser_name] = useState(null);
  // var user_name;

  const getLogin = async () => {
    const { data } = await supabase.auth.getSession(); //メソッドで非同期処理を行う

    if (data.session) {
      const a = await supabase.auth.getUser();
      setAuth(data.session.access_token);
      setUser(a.data.user.id);
      setUser_name(a.data.user.user_metadata.Name);
      try {
        const { data, error } = await supabase
          .from("workout_menu")
          .select("*")
          .eq("user_name", a.data.user.user_metadata.Name);
        // console.log(user_name);
        console.log(data);
        setTraining(data);
      } catch (error) {
        alert(error.message);
      }
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const handleSetRoute = () => {
    nav("");
  };

  return (
    <div>
      <Header />
      <main className="main">
        <Yotei
          user_id={user}
          auth={auth}
          user_name={user_name}
          training={training}
        />
        <br />

        {auth ? (
          <div className="main__mem">
            <Training user_id={user} auth={auth} user_Name={user_name} />
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};
